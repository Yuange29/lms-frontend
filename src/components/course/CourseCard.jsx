import {
    CourseDescription,
    CoursePrice,
    CourseTitle,
    CourseWrapper,
    IconWrapper,
    InfoWrapper,
    MenuButton,
    MenuWrapper,
    ThumbnailImage,
} from "./courses-style";

import { Text } from "../ui/text";
import defaultImg from "../../assets/defaultImg.png";
import { formatPrice } from "../../utils/format";
import { useState } from "react";

function CourseCard({ course, onClick }) {
    const [showMenu, setShowMenu] = useState(false);

    const img = !course.thumbnail_url ? defaultImg : course.thumbnail_url;

    return (
        <CourseWrapper onClick={onClick}>
            <IconWrapper>
                <ThumbnailImage src={img} alt={course.title} />
            </IconWrapper>

            <InfoWrapper>
                <CourseTitle>{course.title}</CourseTitle>
                <CourseDescription>
                    {course.description || "Không có ghi chú"}
                </CourseDescription>
                <CoursePrice>
                    Giá khóa học: {formatPrice(course.price)}
                </CoursePrice>
            </InfoWrapper>

            <MenuWrapper>
                <MenuButton
                    onClick={(event) => {
                        event.stopPropagation();
                        setShowMenu(!showMenu);
                    }}
                >
                    <Text>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </Text>
                </MenuButton>
            </MenuWrapper>
        </CourseWrapper>
    );
}

export { CourseCard };
