export default function ctr(obj) {
    var clicks = obj.Clicks
    var Impressions = obj.Impressions
    return (clicks / Impressions) * 100
}