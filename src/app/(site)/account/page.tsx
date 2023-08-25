import { Header } from '@/components/header'
import { AccountContent } from '@/components/account-content'

const AccountPage = () => {
  return (
    <div className='h-full rounded-lg bg-secondary w-full overflow-hidden overflow-y-auto'>
      <Header className='from-bg-secondary'>
        <h1 className='text-3xl font-semibold'>Account Sttings</h1>
      </Header>
      <AccountContent />
    </div>
  )
}

export default AccountPage
