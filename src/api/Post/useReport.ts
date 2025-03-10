import axiosInstance from "../axiosInstance";

const useReport = () => {
  const report = async (postId: string, content: string, categoryId: number) => {
    await axiosInstance.post(`/posts/${postId}/report`, {
      category: categoryId,
      content,
    }).catch(error => console.error("신고 도중 오류 발생", error));
  }

  return report;
}

export default useReport;