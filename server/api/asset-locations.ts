import type { AssetLocation } from '~/types'

export default eventHandler(async () => {
    const locations: AssetLocation[] = [
        { id: 1, name: 'Pantry',            icon: 'i-lucide-coffee',           description: 'Common employee pantry and break area containing refrigerators, microwaves, coffee machines, water dispensers, tables, chairs, and other pantry equipment.' },
        { id: 2, name: 'Support Team Area', icon: 'i-lucide-headset',          description: 'Workspace for IT support, customer support, and helpdesk personnel. Stores support workstations, testing devices, spare equipment, networking tools, and diagnostic hardware.' },
        { id: 3, name: 'Executive Room',    icon: 'i-lucide-briefcase',        description: 'Private offices assigned to executives and senior management. Includes executive workstations, conference equipment, printers, and other business-critical assets.' },
        { id: 4, name: 'Workspace Area',    icon: 'i-lucide-monitor',          description: 'General office workspace for developers, engineers, and administrative staff. Contains employee workstations, desktops, laptops, monitors, keyboards, and other office IT equipment.' },
        { id: 5, name: 'UI/UX Room',        icon: 'i-lucide-pencil-ruler',     description: 'Dedicated workspace for UI/UX designers equipped with high-performance workstations, graphic tablets, multiple monitors, design software, and multimedia devices.' },
        { id: 6, name: 'Leads Room',        icon: 'i-lucide-users',            description: 'Office space designated for team leads, supervisors, and project managers. Houses workstations, laptops, monitors, and collaboration equipment assigned to leadership personnel.' },
        { id: 7, name: 'IT Storage',        icon: 'i-lucide-archive',          description: 'Secure storage room for spare IT equipment, peripherals, cables, and retired assets awaiting disposal or redistribution.' },
        { id: 8, name: 'Conference Room',   icon: 'i-lucide-presentation',     description: 'Shared meeting space equipped with presentation equipment, video conferencing devices, whiteboards, and collaboration tools.' },
    ]

    return { locations }
})
