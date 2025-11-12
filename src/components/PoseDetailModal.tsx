import { Modal, Image, Divider, Typography } from "antd";
import {
  InfoCircleOutlined,
  HeartOutlined,
  OrderedListOutlined,
  SwapOutlined,
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
