<template>
  <div class="max-w-full w-full mx-auto px-2 sm:px-4 md:px-8 py-8">
    <div v-if="isLoading" class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div class="bg-white p-6 rounded-xl shadow-xl text-lg font-semibold">Generating tasks...</div>
    </div>
    <div v-if="message" class="fixed top-4 right-4 bg-blue-100 text-blue-800 px-4 py-2 rounded shadow">{{ message }}</div>
    <div v-if="!report" class="text-center mt-20">
      <h2 class="text-2xl font-bold text-slate-800 mb-4">No Personalized Report Found</h2>
      <p class="text-slate-600 mb-6">Please generate a report from your summary page first.</p>
      <button @click="navigateTo('/summary')" class="px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-xl shadow hover:bg-blue-700 transition-all font-sans">
        Back to Summary
      </button>
    </div>
    <div v-else>
      <!-- Gauge Chart for Overall Score -->
      <div class="flex flex-col items-center mb-8">
        <h2 class="text-2xl font-bold text-indigo-700 mb-2 font-sans">Overall Score</h2>
        <GaugeChart :score="report.overall_score" />
        <div class="text-lg font-semibold text-slate-700 mt-2">{{ report.overall_score }}/100</div>
      </div>

      <!-- Summary Card -->
      <div class="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 mb-8">
        <h2 class="text-2xl font-bold text-slate-800 mb-4 font-sans">Summary</h2>
        <div class="prose max-w-none" v-html="report.summary"></div>
      </div>

      <!-- SWOT Analysis Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-green-50 border-green-200 border rounded-xl shadow p-5">
          <h3 class="text-xl font-bold text-green-700 mb-2 font-sans">Strengths</h3>
          <div class="prose" v-html="report.swot_analysis?.strengths"></div>
        </div>
        <div class="bg-red-50 border-red-200 border rounded-xl shadow p-5">
          <h3 class="text-xl font-bold text-red-700 mb-2 font-sans">Weaknesses</h3>
          <div class="prose" v-html="report.swot_analysis?.weaknesses"></div>
        </div>
        <div class="bg-blue-50 border-blue-200 border rounded-xl shadow p-5">
          <h3 class="text-xl font-bold text-blue-700 mb-2 font-sans">Opportunities</h3>
          <div class="prose" v-html="report.swot_analysis?.opportunities"></div>
        </div>
        <div class="bg-yellow-50 border-yellow-200 border rounded-xl shadow p-5">
          <h3 class="text-xl font-bold text-yellow-700 mb-2 font-sans">Threats</h3>
          <div class="prose" v-html="report.swot_analysis?.threats"></div>
        </div>
      </div>

      <!-- Focus Areas Section -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold text-indigo-700 mb-6 font-sans text-center">Focus Areas</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FocusAreaCard
            v-for="key in focusAreaList"
            :key="key"
            :title="focusAreaTitles[key]"
            :description="report.focus_areas?.[key]?.description"
            :callToAction="report.focus_areas?.[key]?.call_to_action"
            @create-task="handleCreateTask"
          />
        </div>
      </div>

      <div class="mt-16">
        <h2 class="text-2xl font-bold text-indigo-700 mb-6 font-sans text-center">Your Tasks (Kanban View)</h2>
        <div v-if="kanbanLoading" class="flex justify-center items-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
        <div v-else-if="kanbanError" class="text-red-600 text-center py-4">{{ kanbanError }}</div>
        <div v-else-if="userTasks.length === 0" class="text-slate-500 text-center py-4">No tasks found. Create some tasks to get started!</div>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full border border-slate-200">
            <thead>
              <tr>
                <th class="bg-slate-100 px-4 py-2 border-b border-r border-slate-200 text-left">Category</th>
                <th v-for="q in quarters" :key="q" class="bg-slate-100 px-4 py-2 border-b border-r border-slate-200 text-center">{{ q }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cat in focusAreaList" :key="cat">
                <td class="font-semibold px-4 py-2 border-b border-r border-slate-200 w-48">{{ focusAreaTitles[cat] }}</td>
                <td v-for="q in quarters" :key="q" class="align-top px-2 py-2 border-b border-r border-slate-200 min-w-[220px]">
                  <div v-for="task in userTasks.filter(t => t.category === cat && t.quarter === q)" :key="task.id" class="bg-white rounded-lg shadow p-3 mb-2 border border-slate-100">
                    <div class="font-bold text-indigo-700">{{ task.title }}</div>
                    <div class="text-slate-600 text-sm mb-1">Due: <span class="font-mono">{{ task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A' }}</span></div>
                    <div class="text-slate-500 text-xs">{{ task.description }}</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="text-center mt-8">
        <button @click="navigateTo('/summary')" class="px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-xl shadow hover:bg-blue-700 transition-all font-sans">
          Back to Summary
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { navigateTo } from 'nuxt/app'
import GaugeChart from '~/components/GaugeChart.vue'
import FocusAreaCard from '~/components/FocusAreaCard.vue'
import { useAuth } from '~/composables/useAuth'
import { useSupabaseClient } from '#imports'

const report = ref(null)
const focusAreaList = ['leadership', 'domain_knowledge', 'technical_skills', 'networking_marketing']
const focusAreaTitles = {
  leadership: 'Leadership',
  domain_knowledge: 'Domain Knowledge',
  technical_skills: 'Technical Skills',
  networking_marketing: 'Networking / Marketing'
}

const { user } = useAuth()
const supabase = useSupabaseClient()
const isLoading = ref(false)
const message = ref('')
const userTasks = ref([])
const kanbanLoading = ref(false)
const kanbanError = ref('')
const quarters = ref([])

async function fetchUserTasks() {
  if (!user.value) return
  kanbanLoading.value = true
  kanbanError.value = ''
  try {
    const { data, error } = await supabase
      .from('user_tasks')
      .select('*')
      .eq('user_id', user.value.id)
      .order('due_date', { ascending: true })
    if (error) throw error
    userTasks.value = data || []
    // Get all unique quarters, sorted
    const allQuarters = Array.from(new Set(userTasks.value.map(t => t.quarter))).sort()
    quarters.value = allQuarters
  } catch (err) {
    kanbanError.value = err.message || 'Failed to load tasks.'
  } finally {
    kanbanLoading.value = false
  }
}

async function handleCreateTask({ area, tasks }) {
  if (!user.value) {
    alert('You must be logged in to create tasks.')
    return
  }
  if (!tasks || !tasks.length) {
    alert('No tasks found for this area.')
    return
  }
  // Prompt for quarter
  let quarter = prompt('Enter quarter for these tasks (e.g., 2024-Q3):', '2024-Q3')
  if (!quarter) return
  isLoading.value = true
  message.value = ''
  try {
    const res = await fetch('/api/generate-tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.value.id,
        category: Object.keys(focusAreaTitles).find(key => focusAreaTitles[key] === area) || area,
        quarter,
        tasks
      })
    })
    if (!res.ok) {
      const errText = await res.text()
      throw new Error(errText)
    }
    const data = await res.json()
    message.value = `Successfully created ${data.tasks.length} tasks for ${area}.`
    alert(message.value)
    await fetchUserTasks()
  } catch (err) {
    message.value = 'Error creating tasks: ' + (err.message || err)
    alert(message.value)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  try {
    const data = localStorage.getItem('personalizedReport')
    if (data) {
      report.value = JSON.parse(data)
    }
  } catch (e) {
    report.value = null
  }
  await fetchUserTasks()
})
</script>

<style scoped>
.bg-white {
  background: #fff;
}
.prose ul {
  list-style-type: disc;
  margin-left: 1.5em;
}
</style> 