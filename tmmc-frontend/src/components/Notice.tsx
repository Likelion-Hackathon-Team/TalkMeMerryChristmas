import styled from "styled-components";
import { useEffect, useState, Dispatch, SetStateAction } from "react";

interface noticeProps {
  content: string;
  over: boolean;
  setOver: Dispatch<SetStateAction<boolean>>;
}

export default function Notice(props: noticeProps) {
  const { content, over, setOver } = props;
  const [position, setPosition] = useState(-100);

  useEffect(() => {
    if (over) {
      setPosition(30);
      setTimeout(() => {
        setPosition(-100);
        setOver(false);
      }, 1500);
    }
  }, [over]);

  return (
    <Container position={position}>
      <span>{content}</span>
    </Container>
  );
}

const Container = styled.div<{ position: number }>`
  width: 60%;
  padding: 10px 20px;
  background: #242424;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  position: absolute;
  top: ${(props) => `${props.position}px`};
  left: 50%;
  transform: translateX(-50%);
  z-index: 999999;
  transition: all 0.25s ease;
  cursor: default;

  & > span {
    font-size: 14px;
    color: white;
    font-weight: 600;
  }
`;
