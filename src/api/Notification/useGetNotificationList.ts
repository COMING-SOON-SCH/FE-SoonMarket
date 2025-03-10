import { useCallback, useState } from "react";
import { NotificationType } from "../../type/notificationType";
import axiosInstance from "../axiosInstance";

const useGetNotificationList = () => {
	const [notificationList, setNotificationList] = useState<NotificationType[]>([]);

	const getNotificationList = useCallback(async () => {
		await axiosInstance.get("/notification/recent")
			.then((response) => {
				setNotificationList(response.data);
			})
			.catch((error) => {
				console.error("알림 목록 가져오기 오류", error);
			});
	}, []);

	return { notificationList, getNotificationList };
};

export default useGetNotificationList;