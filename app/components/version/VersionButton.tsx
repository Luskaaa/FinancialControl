"use client";

import { useState } from "react";
import { Button, Modal, Timeline, Tag } from "antd";
import { InfoCircleOutlined, RocketOutlined } from "@ant-design/icons";
import { APP_VERSION, CHANGELOG } from "@/constants/version";

export default function VersionButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        type="default"
        shape="circle"
        icon={<InfoCircleOutlined />}
        onClick={() => setIsModalOpen(true)}
        className="fixed md:bottom-6 md:right-6 w-12 h-12 shadow-lg z-50"
        title={`Versão ${APP_VERSION}`}
      />

      <Modal
        title={
          <div className="flex items-center gap-2">
            <RocketOutlined />
            <span>Novidades da App</span>
            <Tag color="blue">v{APP_VERSION}</Tag>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={
          <Button type="primary" onClick={() => setIsModalOpen(false)}>
            Fechar
          </Button>
        }
        width={500}
      >
        <div className="max-h-96 overflow-y-auto py-4">
          <Timeline
            items={CHANGELOG.map((release) => ({
              color: "blue",
              children: (
                <div key={release.version}>
                  <div className="flex items-center gap-2 mb-2">
                    <Tag color="green">v{release.version}</Tag>
                    <span className="text-gray-500 text-sm">
                      {release.date}
                    </span>
                  </div>
                  <ul className="list-none p-0 m-0 space-y-1">
                    {release.changes.map((change, index) => (
                      <li key={index} className="text-sm">
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            }))}
          />
        </div>
      </Modal>
    </>
  );
}
