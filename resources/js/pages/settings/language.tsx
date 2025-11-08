import type { BreadcrumbItem } from '@/types';
import { edit as editAppearance } from '@/routes/appearance';
import { Head, router } from '@inertiajs/react';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import language from '@/routes/language';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: editAppearance().url,
    },
];
export default function Language() {
    const { t } = useTranslation();
    const { i18n } = useTranslation()

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        router.post(language.change(), { lang });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Language settings')} />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title={t('Language settings')}
                        description={t(
                            "Update your account's Language settings",
                        )}
                    />
                    <ButtonGroup  orientation={'vertical'} >
                        <Button onClick={() => changeLanguage('en')}>
                            English
                        </Button>
                        <Button onClick={() => changeLanguage('ar')}>
                            إنجليزي
                        </Button>
                    </ButtonGroup>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
