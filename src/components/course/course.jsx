import { faEllipsisVertical, faFile } from "@fortawesome/free-solid-svg-icons";
import { memo, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text } from "../ui/Text";
import { formatPrice } from "../../utils/getDay";
import styled from "styled-components";

function CoursesInfo({ courses = [] }) {
    return (
        <CoursesWrapper>
            {Array.isArray(courses) &&
                courses.map((course) => (
                    <CourseItemMemo key={course.id} course={course} />
                ))}
        </CoursesWrapper>
    );
}

function CourseItem({ course }) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <CourseWrapper>
            <IconWrapper>
                {course.thumbnail_url ? (
                    <ThumbnailImage
                        src={course.thumbnail_url}
                        alt={course.title}
                    />
                ) : (
                    <FontAwesomeIcon icon={faFile} size="xl" color="#6366f1" />
                )}
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
                <MenuButton onClick={() => setShowMenu(!showMenu)}>
                    <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
                </MenuButton>
            </MenuWrapper>
        </CourseWrapper>
    );
}

const CoursesWrapper = styled.div`
    width: 100%;
    margin-top: 1em;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    @media (max-width: 1000px) {
        grid-template-columns: 1fr;
    }
`;

const CourseWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100px;
    gap: 1rem;
    padding: 0.5em;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
        scale: 1.01;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
    width: 80px;
    height: 80px;
    background-color: #f3f4f6;
    border-radius: 6px;
    overflow: hidden;
`;

const ThumbnailImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const InfoWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 0;
`;

const CourseTitle = styled(Text)`
    font-weight: 600;
    font-size: 1rem;
    color: #1f2937;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const CoursePrice = styled(Text)`
    font-weight: 500;
    font-size: 0.975rem;
    color: #1f2937;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const CourseDescription = styled(Text)`
    font-size: 0.875rem;
    color: #6b7280;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const MenuWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MenuButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
    transition: color 0.2s ease;

    &:hover {
        color: #1f2937;
    }
`;

const CourseItemMemo = memo(CourseItem);

export default memo(CoursesInfo);
