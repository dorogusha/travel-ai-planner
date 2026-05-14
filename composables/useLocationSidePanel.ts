export type LocationDetails = {
  name: string
  address?: string
  status?: string
  history?: string
  legends?: string
  architecture?: string
  notablePeople?: string
  interestingFacts?: string
}

export function useLocationSidePanel() {
  const drawerOpen = useState('location-side-panel-open', () => false)
  const tab = useState<'info' | 'chat'>('location-side-panel-tab', () => 'info' as const)
  const location = useState<LocationDetails | null>('location-side-panel-location', () => null)

  function toggleDrawer() {
    drawerOpen.value = !drawerOpen.value
  }

  function openWithLocation(details: LocationDetails) {
    location.value = details
    drawerOpen.value = true
    tab.value = 'info'
  }

  function setTab(next: 'info' | 'chat') {
    tab.value = next
  }

  return {
    drawerOpen,
    tab,
    location,
    toggleDrawer,
    openWithLocation,
    setTab
  }
}
