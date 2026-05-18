import { Instagram, MessageCircle, ShoppingBag, Sparkles } from 'lucide-react';

const fallbackLine = '#';

export default function SocialLinks({ settings, variant = 'primary' }) {
  const links = [
    {
      label: 'LINE',
      href: settings.lineUrl || fallbackLine,
      icon: MessageCircle,
      disabled: !settings.lineUrl || settings.lineUrl === '#',
    },
    { label: 'Instagram', href: settings.instagramUrl, icon: Instagram },
    { label: 'Shopee', href: settings.shopeeUrl, icon: ShoppingBag },
    { label: 'TikTok', href: settings.tiktokUrl, icon: Sparkles },
  ];

  return (
    <div className={`social-links ${variant}`}>
      {links.map(({ label, href, icon: Icon, disabled }) => (
        <a
          aria-disabled={disabled ? 'true' : 'false'}
          className={disabled ? 'disabled' : ''}
          href={disabled ? undefined : href}
          key={label}
          rel="noreferrer"
          target={disabled ? undefined : '_blank'}
          title={disabled ? 'รอใส่ลิงก์ LINE OA' : label}
        >
          <Icon size={18} />
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}
