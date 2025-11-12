import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Pagination, Spin, Layout, Typography } from "antd";
import { FireOutlined } from "@ant-design/icons"; // Sử dụng icon có sẵn
import { fetchAllPoses } from "./api/poses";
import { Pose } from "./types";
import PoseCard from "./components/PoseCard";
import PoseDetailModal from "./components/PoseDetailModal";
import Filters from "./components/Filters";

const { Header, Content } = Layout;

export default function App() {
  const [poses, setPoses] = useState<Pose[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const [selected, setSelected] = useState<Pose | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchAllPoses();
        setPoses(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [query, category]);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(poses.map((p) => p.category).filter(Boolean) as string[])
      ),
    [poses]
  );

  const filtered = useMemo(() => {
    let arr = poses;
    if (category) arr = arr.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (p) =>
          (p.english_name || "").toLowerCase().includes(q) ||
          (p.sanskrit_name || "").toLowerCase().includes(q) ||
          (p.target || "").toLowerCase().includes(q)
      );
    }
    return arr;
  }, [poses, category, query]);

  const paged = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page]
  );

  const handleReset = () => {
    setQuery("");
    setCategory(undefined);
    setPage(1);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <FireOutlined style={{ fontSize: 24, color: "white" }} />
        <Typography.Title level={3} style={{ color: "white", margin: 0 }}>
          Yoga Energy — Flow with Strength
        </Typography.Title>
      </Header>
      <Content style={{ padding: 24 }}>
        <div className="filters-bar">
          <Filters
            q={query}
            setQ={setQuery}
            category={category}
            setCategory={setCategory}
            categories={categories}
            onReset={handleReset}
          />
        </div>
        {loading ? (
          <Spin />
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {paged.map((pose, i) => (
                <Col xs={24} sm={12} md={8} lg={6} key={i}>
                  <PoseCard
                    pose={pose}
                    onOpen={(p) => {
                      setSelected(p);
                      setModalVisible(true);
                    }}
                  />
                </Col>
              ))}
            </Row>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 24,
              }}
            >
              <Pagination
                current={page}
                total={filtered.length}
                pageSize={pageSize}
                onChange={(p) => setPage(p)}
                showSizeChanger={false}
              />
            </div>
          </>
        )}

        <PoseDetailModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          pose={selected || undefined}
        />
      </Content>
    </Layout>
  );
}
