import {
    FormContainer,
    FormGroup,
    FormInput,
    FormLabel,
    FormLinkButton,
    FormLinkContainer,
    FormLinkText,
    FormTitle,
    FormWrapper,
} from "../components/form_ui";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

import Button from "../components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authService } from "../services/auth.service";
import { setAccessToken } from "../services/api";
import styled from "styled-components";
import { useAuth } from "../hooks/authHook";
import { useState } from "react";
import { useToast } from "../hooks/toastHook";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast();
    const { setUser } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }

        setIsLoading(true);
        try {
            const res = await authService.signin(
                formData.email,
                formData.password,
            );
            setAccessToken(res.accessToken);

            const resMe = await authService.me();
            setUser(resMe.user);

            window.history.pushState(null, "", "/");
            window.dispatchEvent(new Event("app:navigate"));
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.message || "Đăng nhập thất bại");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormContainer>
            <FormWrapper onSubmit={handleSubmit}>
                <FormTitle>Đăng Nhập</FormTitle>

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
                        placeholder="Nhập mật khẩu"
                        required
                        disabled={isLoading}
                    />
                </FormGroup>

                <SubmitButton type="submit" fullWidth disabled={isLoading}>
                    {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
                </SubmitButton>

                <FormLinkContainer>
                    <FormLinkText>Chưa có tài khoản? </FormLinkText>
                    <LinkButton
                        onClick={() => {
                            window.history.pushState(null, "", "/register");
                            window.dispatchEvent(new Event("app:navigate"));
                        }}
                        disabled={isLoading}
                    >
                        Đăng kí ngay
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
