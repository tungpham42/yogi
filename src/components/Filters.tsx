import { Input, Select, Row, Col, Button } from "antd";
import {
  SearchOutlined,
  UndoOutlined,
  FilterOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

type Props = {
  q: string;
  setQ: (v: string) => void;
  category: string | undefined;
  setCategory: (v?: string) => void;
  categories: string[];
  onReset: () => void;
};

export default function Filters({
  q,
  setQ,
  category,
  setCategory,
  categories,
  onReset,
}: Props) {
  return (
    <Row gutter={16} style={{ marginBottom: 16 }} align="middle">
      <Col xs={24} sm={10} style={{ marginTop: 8 }}>
        <Search
          placeholder="Tìm tên (Sanskrit / Tiếng Việt) hoặc mục tiêu..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          allowClear
          enterButton={<SearchOutlined />}
        />
      </Col>
      <Col xs={24} sm={6} style={{ marginTop: 8 }}>
        <Select
          placeholder={
            <span>
              <FilterOutlined style={{ marginRight: 8 }} />
              Lọc theo cấp độ
            </span>
          }
          value={category}
          onChange={(v) => setCategory(v || undefined)}
          allowClear
          style={{ width: "100%" }}
        >
          <Option value="">Tất cả</Option>
          {categories.map((c) => (
            <Option key={c} value={c}>
              {c}
            </Option>
          ))}
        </Select>
      </Col>
      <Col xs={24} sm={4} style={{ marginTop: 8 }}>
        <Button
          onClick={onReset}
          style={{ width: "100%" }}
          disabled={!q && !category}
          icon={<UndoOutlined />}
        ></Button>
      </Col>
    </Row>
  );
}
