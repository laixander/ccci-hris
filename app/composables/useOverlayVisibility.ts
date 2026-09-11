// composables/useOverlayVisibility.ts
export function useOverlayVisibility() {
    const openOverlays = useState<number>('open-overlays-count', () => 0)

    function register(isOpen: Ref<boolean>) {
        watch(isOpen, (val) => {
            openOverlays.value += val ? 1 : -1
        })
    }

    const isAnyOverlayOpen = computed(() => openOverlays.value > 0)

    return { register, isAnyOverlayOpen }
}