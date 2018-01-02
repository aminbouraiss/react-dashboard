export var currencyList = [
    'Commissions (USD)',
    'Media Cost (USD)',
    'Revenue (USD)',
    'Sales (USD)',
    'ROAS',
    'CPM',
    'CPC'
]
export var ratioList = ['CTR', 'ROAS', 'CPM', 'CPC', 'Conv Rate']

export var ratioObj = {
    CTR: {
        required: [
            'Impressions', 'Clicks'
        ],
        formula: (row) => (row.Clicks / row.Impressions) * 100
    },
    ROAS: {
        required: [
            'Revenue (USD)', 'Media Cost (USD)'
        ],
        formula: (row) => (row['Revenue (USD)'] / row['Media Cost (USD)'])
    },
    CPM: {
        required: [
            'Impressions', 'Media Cost (USD)'
        ],
        formula: (row) => (row['Media Cost (USD)'] / row.Impressions) * 1000
    },
    CPC: {
        required: [
            'Clicks', 'Media Cost (USD)'
        ],
        formula: (row) => (row['Media Cost (USD)'] / row.Clicks)
    },
    'Conv Rate': {
        required: [
            'Transactions', 'Clicks'
        ],
        formula: (row) => (row.Transactions / row.Clicks) * 100
    }
}