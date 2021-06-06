import { ref, onMounted } from 'vue'
import { fetchMatchHistory } from '../api.js'

export default function useApi() {
    const matches = ref([])

    const getMatchHistory = async () => {
        matches.value = await fetchMatchHistory()
    }

    onMounted(getMatchHistory)

    return {
        matches,
        getMatchHistory,
    }
}
