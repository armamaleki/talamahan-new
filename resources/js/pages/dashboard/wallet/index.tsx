import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Wallet',
        href: '#',
    },
];

export default function Index({walletItem}) {
    return(
      <AppLayout breadcrumbs={breadcrumbs}>
          {walletItem.data.symbol}
          <br/>
          {walletItem.data.balance}
      </AppLayout>
    );
}
