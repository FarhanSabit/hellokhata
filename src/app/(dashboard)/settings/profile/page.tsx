'use client'
import { SectionHeader, SettingsCard, SettingsInput, SaveButton } from '@/components/settings/SettingsComponent'
import { useUpdateUser } from '@/hooks/api/useSettings';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useSessionStore, useUser } from '@/stores';
import { Mail, Phone, User } from 'lucide-react'
import { useState } from 'react';
import { toast } from 'sonner';


const ProfilePage = () => {
  const { t, isBangla, changeLanguage } = useAppTranslation();
  const user = useUser();
  const { updateUser: updateUserStore } = useSessionStore()
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });

  const { mutate: updateUser, isPending } = useUpdateUser()


  // Save handlers
  const handleSaveProfile = async () => {
    // handle profile here
    console.log('profileForm', profileForm);
    updateUser(profileForm, {
      onSuccess: data => {
        if (data.success)
          updateUserStore(data.data)
        toast.success('Profile Updated Successfully!')
      }
    })

  };
  return (
    <SettingsCard>
      <SectionHeader
        icon={User}
        title={isBangla ? 'ব্যক্তিগত প্রোফাইল' : 'Personal Profile'}
        description={isBangla ? 'আপনার ব্যক্তিগত তথ্য পরিচালনা করুন' : 'Manage your personal information'}
        iconColor="primary"
      />

      <div className="w-full space-y-4">
        <SettingsInput
          label={isBangla ? 'নাম' : 'Name'}
          icon={User}
          value={profileForm?.name}
          onChange={(v) => setProfileForm({ ...profileForm, name: v })}
          placeholder={isBangla ? 'আপনার নাম লিখুন' : 'Enter your name'}
        />
        <SettingsInput
          label={isBangla ? 'ফোন' : 'Phone'}
          icon={Phone}
          value={profileForm?.phone}
          onChange={(v) => setProfileForm({ ...profileForm, phone: v })}
          placeholder="01XXXXXXXXX"
        />
        <SettingsInput
          label={isBangla ? 'ইমেইল' : 'Email'}
          icon={Mail}
          type="email"
          value={profileForm.email}
          onChange={(v) => setProfileForm({ ...profileForm, email: v })}
          placeholder="example@email.com"
        />
      </div>

      <SaveButton
        onClick={handleSaveProfile}
        isLoading={isPending}
        label={t('common.save')}
      />
    </SettingsCard>
  )
}

export default ProfilePage
