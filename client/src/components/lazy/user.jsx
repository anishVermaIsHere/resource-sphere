import dynamic from "next/dynamic";

const Dashboard = dynamic(()=>import('../../features/user/components/dashboard')),
Resources = dynamic(()=>import('../../features/user/components/resources'))



export {
    Dashboard,
    Resources
}