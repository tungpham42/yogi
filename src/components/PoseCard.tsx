import { Card, Tag } from "antd";
import { ClockCircleOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Pose } from "../types";

const { Meta } = Card;

export default function PoseCard({
  pose,
  onOpen,
}: {
  pose: Pose;
  onOpen: (p: Pose) => void;
}) {
  return (
    <Card
      hoverable
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      bodyStyle={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: "16px",
      }}
      cover={
        pose.image ? (
          <img
            alt={pose.english_name}
            src={pose.image}
            style={{ height: 200, objectFit: "cover" }}
          />
        ) : undefined
      }
      onClick={() => onOpen(pose)}
      actions={[
        <ClockCircleOutlined key="time" />,
        <AppstoreOutlined key="category" />,
      ]}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Meta
          title={`${pose.english_name} — ${pose.sanskrit_name}`}
          description={
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ flex: 1, minHeight: 40 }}>
                {pose.description?.slice(0, 120)}
                {pose.description && pose.description.length > 120 ? "…" : ""}
              </div>
              <div style={{ marginTop: "auto", paddingTop: 8 }}>
                {pose.category && (
                  <Tag icon={<AppstoreOutlined />} color="blue">
                    {pose.category}
                  </Tag>
                )}
                {pose.time && (
                  <Tag icon={<ClockCircleOutlined />} color="green">
                    {pose.time}
                  </Tag>
                )}
              </div>
            </div>
          }
        />
      </div>
    </Card>
  );
}
