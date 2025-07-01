import { AuthButton } from '@/components/AuthButton';
import AuthRedirector from '@/components/AuthRedirector';
import ButtonAppBar from '@/components/ButtonAppBar';
import { Content } from '@/components/Content';
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  
  return (
    <>
      <ButtonAppBar/>
      <Content />      
    </>
  )
}
