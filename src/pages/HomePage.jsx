import Button from "../components/ui/Button";
import { H } from "../components/ui/Text";
import { Section } from "../components/ui/Secttion";
import styled from "styled-components";

export default function HomePage() {
    return (
        <HomePageStyle>
            <H align="center">Home Page</H>

            <Button navigate="/setting" isDanger={true}>
                Click me
            </Button>

            <Section id={"text"} bgColor={true}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Ratione nesciunt et deserunt, ex recusandae aspernatur! Ab omnis
                deleniti sit, nisi provident nostrum aut amet enim magni, ipsum
                laudantium suscipit expedita. Enim, assumenda. Perferendis nihil
                consequuntur ducimus, libero tempore dignissimos enim delectus
                eius odio hic fugiat nesciunt? Repudiandae voluptate quo,
                suscipit fuga modi, cum placeat quam sunt obcaecati odit eveniet
                asperiores. Adipisci dolore vero, delectus hic alias similique
                culpa inventore voluptates quae perferendis rerum at, facilis
                optio deserunt nobis recusandae, reprehenderit illum. Qui quas
                perferendis quam eligendi, ullam facere laudantium doloribus?
                Quaerat doloremque tempore rem ab in, distinctio aliquam nulla,
                nesciunt at minus odit nam sit alias amet. Consequuntur illum
                repellendus, similique tempore eligendi maxime debitis, sint
                reprehenderit ex omnis qui! Delectus consequuntur tenetur porro
                corrupti libero omnis, at fugit, molestiae ut optio eveniet
                autem adipisci! Consequatur dolorem, odit suscipit illum optio
                esse. Expedita, at. Cumque unde explicabo quaerat sequi velit.
            </Section>
        </HomePageStyle>
    );
}

const HomePageStyle = styled.div``;
