const fetchMissionDurations = require('../../utils/info/fetch-mission-durations');
const fetchMissionSuccess = require('../../utils/info/fetch-mission-successes');

module.exports = {
    async mission_complexity(req, res) {
        res.json({
            duration_complexity: await fetchMissionDurations(),
            success_complexity:await fetchMissionSuccess(),
        })
    },
}