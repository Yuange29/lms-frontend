import {
    FormContainer,
    FormFileInput,
    FormGroup,
    FormInput,
    FormLabel,
    FormLinkButton,
    FormLinkContainer,
    FormLinkText,
    FormTitle,
    FormWrapper,
} from "../components/form_ui";
import {
    faEnvelope,
    faImage,
    faLock,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

import Button from "../components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authService } from "../services/auth.service";
import { setAccessToken } from "../services/api";
import styled from "styled-components";
import { useAuth } from "../hooks/authHook";
import { useState } from "react";
import { useToast } from "../contexts/ToastContext";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        full_name: "",
        avatar_url: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useAuth();
    const { toast } = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    avatar_url: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password || !formData.full_name) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }

        setIsLoading(true);
        try {
            await authService.signup(...formData);

            const resLogin = await authService.signin(
                formData.email,
                formData.password,
            );
            setAccessToken(resLogin.accessToken);

            const resMe = await authService.me();
            setUser(resMe.user);

            window.history.pushState(null, "", "/");
            window.dispatchEvent(new Event("app:navigate"));
        } catch (error) {
            console.error("Register error:", error);
            toast.error(error.message || "Đăng kí thất bại");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormContainer>
            <FormWrapper onSubmit={handleSubmit}>
                <FormTitle>Đăng Kí Tài Khoản</FormTitle>

                <FormGroup>
                    <FormLabel
                        htmlFor="email"
                        icon={() => <FontAwesomeIcon icon={faEnvelope} />}
                    >
                        Email
                    </FormLabel>
                    <FormInput
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Nhập email của bạn"
                        required
                        disabled={isLoading}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel
                        htmlFor="password"
                        icon={() => <FontAwesomeIcon icon={faLock} />}
                    >
                        Mật khẩu
                    </FormLabel>
                    <FormInput
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                        required
                        disabled={isLoading}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel
                        htmlFor="full_name"
                        icon={() => <FontAwesomeIcon icon={faUser} />}
                    >
                        Họ và tên
                    </FormLabel>
                    <FormInput
                        id="full_name"
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="Nhập họ và tên"
                        required
                        disabled={isLoading}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel
                        htmlFor="avatar"
                        icon={() => <FontAwesomeIcon icon={faImage} />}
                    >
                        Ảnh đại diện
                    </FormLabel>
                    <FormFileInput
                        id="avatar"
                        name="avatar"
                        onChange={handleFileChange}
                        disabled={isLoading}
                        accept="image/*"
                    />
                </FormGroup>

                <SubmitButton type="submit" fullWidth disabled={isLoading}>
                    {isLoading ? "Đang đăng kí..." : "Đăng Kí"}
                </SubmitButton>

                <FormLinkContainer>
                    <FormLinkText>Đã có tài khoản? </FormLinkText>
                    <LinkButton
                        onClick={() => {
                            window.history.pushState(null, "", "/signin");
                            window.dispatchEvent(new Event("app:navigate"));
                        }}
                        disabled={isLoading}
                    >
                        Đăng nhập ngay
                    </LinkButton>
                </FormLinkContainer>
            </FormWrapper>
        </FormContainer>
    );
}

const SubmitButton = styled(Button)`
    margin-top: 0.5rem;
`;

const LinkButton = styled(FormLinkButton)``;
