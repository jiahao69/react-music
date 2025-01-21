import { memo, useState } from "react"
import type { FC, ReactNode } from "react"
import { Modal } from "antd"

interface IProps {
  children?: ReactNode
}

const LoginPanel: FC<IProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Modal
      title="登录"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="登录"
      cancelText="取消"
      maskClosable={false}
    ></Modal>
  )
}

export default memo(LoginPanel)
