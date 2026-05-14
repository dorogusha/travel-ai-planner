<template>
  <QLayout view="hHh Lpr lff" class="location-side-layout">
    <QHeader elevated class="bg-primary text-white">
      <QToolbar>
        <QBtn
          flat
          round
          dense
          icon="menu"
          aria-label="Toggle location panel"
          @click="toggleDrawer"
        />
        <QToolbarTitle>Excursion AI Planner</QToolbarTitle>
      </QToolbar>
    </QHeader>

    <QDrawer
      v-model="drawerOpen"
      side="left"
      overlay
      bordered
      elevated
      :width="360"
      :breakpoint="1024"
      behavior="default"
      class="column bg-grey-1"
    >
      <div class="q-pa-sm">
        <QTabs
          v-model="tab"
          dense
          class="text-primary bg-white rounded-borders"
          align="justify"
          narrow-indicator
          indicator-color="primary"
        >
          <QTab name="info" label="Info" />
          <QTab name="chat" label="Chat" />
        </QTabs>
      </div>

      <QSeparator />

      <QTabPanels v-model="tab" animated class="col column" style="min-height: 0">
        <QTabPanel name="info" class="col q-pa-none column" style="min-height: 0">
          <QScrollArea class="col">
            <div class="q-pa-md">
              <template v-if="location">
                <div class="text-h6 q-mb-sm">{{ location.name }}</div>
                <div v-if="location.address" class="text-body2 q-mb-md text-grey-8">
                  {{ location.address }}
                </div>
                <QList bordered separator class="rounded-borders bg-white">
                  <QItem v-if="location.status">
                    <QItemSection>
                      <QItemLabel caption>Current status</QItemLabel>
                      <QItemLabel>{{ location.status }}</QItemLabel>
                    </QItemSection>
                  </QItem>
                  <QItem v-if="location.history">
                    <QItemSection>
                      <QItemLabel caption>History</QItemLabel>
                      <QItemLabel class="text-wrap">{{ location.history }}</QItemLabel>
                    </QItemSection>
                  </QItem>
                  <QItem v-if="location.legends">
                    <QItemSection>
                      <QItemLabel caption>Legends</QItemLabel>
                      <QItemLabel class="text-wrap">{{ location.legends }}</QItemLabel>
                    </QItemSection>
                  </QItem>
                  <QItem v-if="location.architecture">
                    <QItemSection>
                      <QItemLabel caption>Architecture</QItemLabel>
                      <QItemLabel class="text-wrap">{{ location.architecture }}</QItemLabel>
                    </QItemSection>
                  </QItem>
                  <QItem v-if="location.notablePeople">
                    <QItemSection>
                      <QItemLabel caption>Notable people</QItemLabel>
                      <QItemLabel class="text-wrap">{{ location.notablePeople }}</QItemLabel>
                    </QItemSection>
                  </QItem>
                  <QItem v-if="location.interestingFacts">
                    <QItemSection>
                      <QItemLabel caption>Interesting facts</QItemLabel>
                      <QItemLabel class="text-wrap">{{ location.interestingFacts }}</QItemLabel>
                    </QItemSection>
                  </QItem>
                </QList>
              </template>
              <div v-else class="text-body2 text-grey-7">
                Select a place on the map to see details here, or open this panel with the menu
                button.
              </div>
            </div>
          </QScrollArea>
        </QTabPanel>

        <QTabPanel name="chat" class="col column q-pa-none" style="min-height: 0">
          <QScrollArea ref="chatScrollRef" class="col q-pa-md">
            <QChatMessage
              v-for="(m, i) in messages"
              :key="i"
              :name="m.role === 'user' ? 'You' : 'Assistant'"
              :text="[m.text]"
              :sent="m.role === 'user'"
              :bg-color="m.role === 'user' ? 'primary' : 'grey-3'"
              :text-color="m.role === 'user' ? 'white' : 'dark'"
            />
          </QScrollArea>
          <QSeparator />
          <div class="q-pa-sm bg-white row items-end q-gutter-xs">
            <QInput
              v-model="draft"
              class="col"
              type="textarea"
              autogrow
              dense
              outlined
              placeholder="Ask about this location…"
              @keydown.enter.exact.prevent="sendMessage"
            />
            <QBtn color="primary" icon="send" round dense :disable="!draft.trim()" @click="sendMessage" />
          </div>
        </QTabPanel>
      </QTabPanels>
    </QDrawer>

    <QPageContainer class="col">
      <QPage class="fit q-pa-none">
        <slot />
      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<script setup lang="ts">
type ChatMessageRow = { role: 'user' | 'assistant'; text: string }

const { drawerOpen, tab, location, toggleDrawer } = useLocationSidePanel()

const messages = ref<ChatMessageRow[]>([
  {
    role: 'assistant',
    text: 'Ask anything about the selected location. Answers are placeholders until you connect an API route.'
  }
])
const draft = ref('')
const chatScrollRef = ref<{ setScrollPosition?: (axis: string, offset: number, duration?: number) => void } | null>(
  null
)

async function sendMessage() {
  const text = draft.value.trim()
  if (!text) {
    return
  }

  const contextName = location.value?.name ?? 'this area'
  messages.value.push({ role: 'user', text })
  draft.value = ''

  await nextTick()
  chatScrollRef.value?.setScrollPosition?.('vertical', 99999, 300)

  const answer = await $fetch<string>('/api/location-chat', {
    method: 'POST',
    body: {
      location: location.value,
      message: text
    }
  }).catch(() => null)

  messages.value.push({
    role: 'assistant',
    text:
      answer ??
      `[Demo] I would answer about “${contextName}” once \`/api/location-chat\` is implemented.`
  })

  await nextTick()
  chatScrollRef.value?.setScrollPosition?.('vertical', 99999, 300)
}
</script>

<style scoped>
.location-side-layout {
  min-height: 100vh;
}
</style>
