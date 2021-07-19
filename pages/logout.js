import React from 'react'
import { useRouter } from 'next/router'
import nookies from 'nookies'

export default function LogoutScreen(context) {
  const router = useRouter();
  nookies.destroy(context, 'USER_TOKEN');

  React.useEffect(() => {
    router.push('/login');
  });

  return <></>;
}