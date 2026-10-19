import dynamic from "next/dynamic";

export const Dashboard = dynamic(()=>import('../../features/user/components/dashboard'))
export const Resources = dynamic(()=>import('../../features/user/components/resources'))



