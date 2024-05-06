import { ProSkeleton } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { Page } from "@/enums";
import {
  videoControllerAddViews as addVideoViews,
  videoControllerInfo as getVideoInfo,
} from "@/servers/go_study_server/video";
import type { VideoInfo } from "@/types";
import { validateNumStr } from "@/utils/tools";

import { Info, Video, VideoComments } from "./components";

export default function VideoInfo() {
  const { vid: vidStr } = useParams<{ vid: string }>();
  const vid = validateNumStr(vidStr || "");
  if (vid === null) return <Navigate to={Page.INDEX} />;
  return <VideoInfoPage vid={vid} />;
}

function VideoInfoPage({ vid }: { vid: number }) {
  const [info, setInfo] = useState<VideoInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    addVideoViews({ vid });
    getVideoInfo({ vid })
      .then(res => {
        setInfo(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [vid]);

  return (
    <>
      {loading && <ProSkeleton type="descriptions" />}
      {info && (
        <>
          <div className="hidden md:block">
            <Info video={info} />
          </div>
          <Video video={info} />
          <VideoComments
            video={info}
            onPostComment={() => {
              setInfo({
                ...info,
                count: { ...info.count, comments: info.count.comments + 1 },
              });
            }}
          />
        </>
      )}
    </>
  );
}
