import { SnowballInterface } from "../../interface/snowballInterface";
import BaseSnowball from "./BaseSnowball";
import {
  CanvasObject,
  CanvasTitle,
  CanvasModal,
} from "../../styles/SnowballStyle";
import { useState, useRef } from "react";
import Draggable from "react-draggable";
import { useRecoilState } from "recoil";
import { recoilDecoState, Decoration } from "../../states/recoilDecorateState";
import {
  recoilCanvasStage,
  CanvasStage,
  FinalStage,
} from "../../states/recoilDecorateState";
import BasicModal from "./../BasicModal";
import { objList } from "../../res/objects";
import axios from "axios";
import { useParams } from "react-router-dom";

interface placementProps {
  info: SnowballInterface;
}

export default function Placement(props: placementProps) {
  const { info } = props;
  const { snowballId } = useParams();
  const nodeRef = useRef(null);
  const [deco, setDeco] = useRecoilState(recoilDecoState);
  const [canvasStage, setCanvasStage] = useRecoilState(recoilCanvasStage);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [over, setOver] = useState(false);
  const [Opacity, setOpacity] = useState(false);

  const [open, setOpen] = useState(false);

  const trackPos = (data: any) => {
    if (data.y >= 0) {
      setOver(false);
      setPosition({ x: data.x, y: data.y });
    } else {
      setOver(true);
      setPosition({ x: data.x, y: 0 });
    }
  };
  const handleStart = () => {
    setOpacity(true);
  };
  const handleEnd = () => {
    setOpacity(false);
  };

  const saveResult = () => {
    const newDecoInfo: Decoration = {
      name: deco.name,
      comment: deco.comment,
      objectId: deco.objectId,
      commonVoice: deco.commonVoice,
      personalVoice: deco.personalVoice,
      top: Number(position.y.toFixed(0)),
      left: Number(position.x.toFixed(0)),
    };

    const multipartFile = new FormData();
    if (newDecoInfo.commonVoice && newDecoInfo.personalVoice) {
      multipartFile.append("writer", newDecoInfo.name);
      multipartFile.append("objetId", `${newDecoInfo.objectId}`);
      multipartFile.append("top", `${newDecoInfo.top}`);
      multipartFile.append("left", `${newDecoInfo.left}`);
      multipartFile.append("commonVoice", newDecoInfo.commonVoice);
      multipartFile.append("personalVoice", newDecoInfo.personalVoice);
      multipartFile.append("comment", newDecoInfo.comment);

      axios
        .post(`http://www.tmmc.shop/api/${snowballId}/new`, multipartFile, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          // ?????? ??? action ?????? ??????
          setOpen(false);
          setDeco(newDecoInfo);
          const complete: CanvasStage = { isCanvasStage: FinalStage.Complete };
          setCanvasStage(complete);
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      alert("?????? ????????? ???????????? ???????????????.");
      return -1;
    }
  };

  return (
    <>
      <CanvasTitle>
        <span className="title">{`??? ???????????? ?????? ????????????\n??????????????? ????????? ????????????.`}</span>
        <button onClick={() => setOpen(true)}>???????????????!</button>
      </CanvasTitle>
      <Draggable
        nodeRef={nodeRef}
        onDrag={(e, data) => trackPos(data)}
        onStart={handleStart}
        onStop={handleEnd}
      >
        <CanvasObject ref={nodeRef} style={{ opacity: Opacity ? "0.6" : "1" }}>
          <img src={objList[deco.objectId - 1].url} alt="object" />
          <span>
            {over ? `?????????\n???????????????.` : `????????? ?????????\n???????????????`}
          </span>
        </CanvasObject>
      </Draggable>
      <BaseSnowball objs={info.messages} />
      <BasicModal open={open}>
        <CanvasModal>
          <div className="title-box">
            <span className="title">?????? ???????????????????</span>
            <span className="subtitle">
              ????????? ?????????????????? ?????????????????? ????????????!
            </span>
          </div>
          <div className="btn-box">
            <button onClick={() => saveResult()} className="yes-btn">
              ???!
            </button>
            <button onClick={() => setOpen(false)} className="no-btn">
              ?????????.
            </button>
          </div>
        </CanvasModal>
      </BasicModal>
    </>
  );
}
