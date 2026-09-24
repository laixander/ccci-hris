import type { AssetCategory } from '~/types'

export default eventHandler(async () => {
    const categories: AssetCategory[] = [
        { id: 1,  name: 'Desktop Computers',  icon: 'i-lucide-monitor',         description: 'Company-issued desktop computers, mini PCs, tower PCs, and all-in-one desktop systems assigned to users.' },
        { id: 2,  name: 'Laptop Computers',   icon: 'i-lucide-laptop',           description: 'Company-issued laptops, ultrabooks, notebooks, and mobile workstations.' },
        { id: 3,  name: 'Mobile Phones',      icon: 'i-lucide-smartphone',       description: 'Smartphones issued to employees for business use.' },
        { id: 4,  name: 'Monitors',           icon: 'i-lucide-monitor-dot',      description: 'LCD, LED, OLED, touchscreen, ultrawide, and professional monitors assigned to users or conference rooms.' },
        { id: 5,  name: 'Keyboards',          icon: 'i-lucide-keyboard',         description: 'Wired, wireless, mechanical, ergonomic, and specialized keyboards issued to users.' },
        { id: 6,  name: 'Mouse',              icon: 'i-lucide-mouse-pointer-2',  description: 'Wired, wireless, ergonomic, gaming, trackball, and other pointing devices assigned to users.' },
        { id: 7,  name: 'Printers',           icon: 'i-lucide-printer',          description: 'Laser, inkjet, multifunction, label, barcode, and receipt printers.' },
        { id: 8,  name: 'Routers',            icon: 'i-lucide-router',           description: 'Devices providing LAN, WAN, and internet connectivity.' },
        { id: 9,  name: 'Headsets & Audio',   icon: 'i-lucide-headphones',       description: 'USB/Bluetooth headsets, microphones, speakers, conference phones, and audio peripherals.' },
        { id: 10, name: 'Webcams',            icon: 'i-lucide-webcam',           description: 'USB webcams, conference cameras, and integrated video collaboration devices.' },
        { id: 11, name: 'External Storage',   icon: 'i-lucide-hard-drive',       description: 'External hard drives, SSDs, USB flash drives, encrypted storage devices, and memory cards.' },
        { id: 12, name: 'Software Licenses',  icon: 'i-lucide-package',          description: 'Perpetual licenses, subscriptions, SaaS, operating systems, and productivity applications.' },
        { id: 13, name: 'Biometric Devices',  icon: 'i-lucide-fingerprint',      description: 'Fingerprint scanners, facial recognition devices, attendance terminals, and biometric readers.' },
        { id: 14, name: 'Office Furniture',   icon: 'i-lucide-armchair',         description: 'Office chairs, desks, standing desks, and workstation furniture.' },
    ]

    return { categories }
})
