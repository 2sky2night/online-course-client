import { Avatar, Skeleton } from "antd";
import { useEffect, useMemo, useState } from "react";

import { Ellipsis, Image } from "@/components";
import { videoCollectionControllerInfo as collectionInfo } from "@/servers/go_study_server/videoCollection";
import { Collection } from "@/types";
import { formatDate } from "@/utils/tools";

import { useCollectionInfoStyles } from "./styles";

interface Props {
  cid: number;
}

export function CollectionData({ cid }: Props) {
  const [collection, setCollection] = useState<Collection | null>(null);
  const { styles } = useCollectionInfoStyles();
  const createTime = useMemo(() => {
    if (collection) {
      return formatDate(collection.created_time);
    } else {
      return "";
    }
  }, [collection]);
  useEffect(() => {
    collectionInfo({ cid }).then(res => {
      setCollection(res.data);
    });
  }, []);
  return collection === null ? (
    <Skeleton />
  ) : (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {collection.collection_cover ? (
            <Image
              src={collection.collection_cover}
              width={50}
              height={50}
              style={{ borderRadius: "3px", objectFit: "cover" }}
            />
          ) : (
            <Avatar
              size="large"
              shape="square">
              {collection.collection_name.substring(0, 1)}
            </Avatar>
          )}
          <div className="ml-2 flex flex-col">
            <span className="text-2xl">{collection.collection_name}</span>
            {collection.description && (
              <Ellipsis
                style={{ width: "230px" }}
                lineClamp={2}>
                {collection.description}
              </Ellipsis>
            )}
          </div>
        </div>
        <span className={styles.textSub}>共 {collection.video_count} 项</span>
      </div>
      <div className="flex justify-end">
        <span className={styles.textSub}>{createTime}</span>
      </div>
    </div>
  );
}
