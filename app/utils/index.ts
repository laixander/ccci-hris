export const dicebearUrl = (seed: string) =>
    `https://api.dicebear.com/10.x/thumbs/svg?seed=${encodeURIComponent(seed)}`

export const initials = (name: string) =>
    name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()

export const avatarColors = [
    'bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 
    'bg-violet-500', 'bg-cyan-500', 'bg-pink-500', 'bg-teal-500'
]

export const avatarColor = (id: number) => avatarColors[id % avatarColors.length]
