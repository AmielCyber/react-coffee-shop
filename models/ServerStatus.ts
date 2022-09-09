interface ServerStatus {
  status: "pending" | "success" | "error"
  title: string
  message: string
}

export default ServerStatus