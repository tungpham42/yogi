import { Modal, Image, Divider, Typography } from "antd";
import {
  InfoCircleOutlined,
  HeartOutlined,
  OrderedListOutlined,
  SwapOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Pose } from "../types";

export default function PoseDetailModal({
  visible,
  onClose,
  pose,
}: {
  visible: boolean;
  onClose: () => void;
  pose?: Pose | null;
}) {
  if (!pose) return null;

  // Hàm extract YouTube ID từ URL
  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const youtubeId = pose.youtube_link ? getYouTubeId(pose.youtube_link) : null;

  return (
    <Modal
      title={`${pose.english_name} — ${pose.sanskrit_name}`}
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      {pose.image && (
        <Image
          src={pose.image}
          alt={pose.english_name}
          style={{
            objectFit: "cover",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            width: "100%",
          }}
        />
      )}

      {/* YouTube Embed */}
      {youtubeId && (
        <>
          <Divider>
            <PlayCircleOutlined style={{ marginRight: 8, color: "#ff4d4f" }} />
            Video Hướng Dẫn
          </Divider>
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%" /* 16:9 aspect ratio */,
              height: 0,
              overflow: "hidden",
              marginBottom: 16,
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>
        </>
      )}

      <Divider />
      <Typography.Paragraph>
        <InfoCircleOutlined style={{ marginRight: 8, color: "#1890ff" }} />
        <strong>Mô tả:</strong> {pose.description}
      </Typography.Paragraph>
      {pose.benefits && (
        <Typography.Paragraph>
          <HeartOutlined style={{ marginRight: 8, color: "#ff4d4f" }} />
          <strong>Lợi ích:</strong> {pose.benefits}
        </Typography.Paragraph>
      )}
      {pose.steps && (
        <>
          <Typography.Paragraph>
            <OrderedListOutlined style={{ marginRight: 8, color: "#52c41a" }} />
            <strong>Các bước:</strong>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ whiteSpace: "break-spaces" }}>
            {pose.steps}
          </Typography.Paragraph>
        </>
      )}
      {pose.variations && (
        <Typography.Paragraph>
          <SwapOutlined style={{ marginRight: 8, color: "#faad14" }} />
          <strong>Biến thể:</strong> {pose.variations}
        </Typography.Paragraph>
      )}
    </Modal>
  );
}
