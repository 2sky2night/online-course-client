import { Avatar, Empty } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Image, Skeleton, VideoItem } from "@/components";
import { Page } from "@/enums";
import { useCheckInWindow } from "@/hooks";
import { videoCollectionControllerVideoList as videoList } from "@/servers/go_study_server/videoCollection";
import type { Collection, Video } from "@/types";

import { useCollecitonItemStyles } from "./styles";

interface Props {
  collection: Collection;
  /** 第几章 */
  index: number;
}

function VideoListSkeleton() {
  return (
    <div className="grid grid-cols-2 grid-rows-1 md:grid-cols-4 gap-2">
      {Array.from({ length: 2 }).map(() => {
        return (
          <div>
            <Skeleton.Skeleton
              width="100%"
              borderRadius="3px"
              height="10vw"
              minHeight="160px"
            />
            <Skeleton.Skeleton
              height="25px"
              width="100%"
              className="mt-2"
            />
            <Skeleton.Skeleton
              height="25px"
              width="80%"
              className="mt-1"
            />
          </div>
        );
      })}
    </div>
  );
}

/**
 * 展示合集详情
 * 支持懒加载合集中的视频1.加载中效果 2.空数据效果
 */
export function CollectionItem({ collection, index }: Props) {
  const { styles } = useCollecitonItemStyles();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  /** 视频列表 */
  const [list, setList] = useState<Video[]>([]);
  const { binder } = useCheckInWindow(() => {
    // 懒加载合集
    videoList({
      cid: collection.collection_id,
      offset: 0,
      limit: 10,
      desc: false,
    }).then(res => {
      setList(res.data.list || []);
      setLoading(false);
    });
  });
  /** 视频列表DOM */
  const listRef = useRef<HTMLDivElement | null>(null);
  /** 点击进入章节详情 */
  const handleCollection = () => {
    navigate(Page.COLLECTION_INFO + "/" + collection.collection_id);
  };
  /** 绑定视口与容器相交监听 */
  useEffect(() => {
    listRef.current && binder(listRef.current);
  }, []);

  return (
    <div className={styles.container}>
      <div className="flex justify-between items-center">
        <div className="flex items-center md:text-xl">
          {collection.collection_cover ? (
            <Image
              src={collection.collection_cover}
              width={30}
              height={30}
              style={{ borderRadius: "6px" }}
            />
          ) : (
            <Avatar shape="square">
              {collection.collection_name.substring(0, 1)}
            </Avatar>
          )}
          <span className="ml-3">{`第 ${index} 章 ${collection.collection_name}`}</span>
        </div>
        <div>
          <span
            className={styles.seeAll}
            onClick={handleCollection}>
            此章节的全部知识点
          </span>
        </div>
      </div>
      <div
        className={styles.videoList}
        ref={listRef}>
        {loading ? (
          <VideoListSkeleton />
        ) : list.length ? (
          <div className={styles.videoListContent}>
            {list.map(item => (
              <div
                className={styles.videoItem}
                key={item.video_id}>
                <VideoItem video={item} />
              </div>
            ))}
          </div>
        ) : (
          <Empty description="暂无数据" />
        )}
      </div>
      <div className="flex justify-end mt-2">
        <span className={styles.videoCount}>
          共 {collection.video_count} 项
        </span>
      </div>
    </div>
  );
}
