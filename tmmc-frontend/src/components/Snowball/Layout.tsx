import { SnowballInterface } from "../../interface/snowballInterface";
import { useRecoilState } from "recoil";
import {
  recoilCanvasStage,
  CanvasStage,
  FinalStage,
} from "../../states/recoilDecorateState";
import { Container } from "../../styles/SnowballStyle";
import NonFinal from "./NonFinal";
import Placement from "./Placement";
import Complete from "./Complete";
import VoiceBoxLayout from "../VoiceBox/VoiceBoxLayout";

interface layoutProps {
  info: SnowballInterface;
  sId: string;
}

export default function Layout(props: layoutProps) {
  const { info, sId } = props;
  const [canvasStage, setCanvasStage] = useRecoilState(recoilCanvasStage);

  return (
    <Container>
      {canvasStage.isCanvasStage === FinalStage.NonFinal ? (
        <NonFinal sId={sId} info={info} />
      ) : canvasStage.isCanvasStage === FinalStage.Placement ? (
        <Placement info={info} />
      ) : canvasStage.isCanvasStage === FinalStage.Complete ? (
        <Complete />
      ) : canvasStage.isCanvasStage === FinalStage.VoiceBox ? (
        <VoiceBoxLayout info={info} sId={sId} />
      ) : (
        <></>
      )}
    </Container>
  );
}
