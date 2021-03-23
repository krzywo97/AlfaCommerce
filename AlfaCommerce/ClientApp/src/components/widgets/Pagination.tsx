import React from 'react'

interface Item {
    number: number,
    key: number,
    label: string,
    enabled: boolean
}

export interface Props {
    currentPage: number,
    totalPages: number,
    surrounding?: number,
    onPageChanged: (page: number) => void
}

function Pagination(props: Props) {
    let surrounding = props.surrounding ?? 3

    // Previous page button
    let pages: Item[] = [{
        number: props.currentPage - 1,
        key: -1,
        label: 'Poprzednia',
        enabled: props.currentPage > 1
    }]

    // First page button
    if (props.currentPage > surrounding + 1) {
        pages.push({
            number: 1,
            key: 1,
            label: '1',
            enabled: true
        })
    }

    let shouldShowPageInsteadOfDots = props.currentPage - surrounding === 3

    // Three dots after first page button
    if (props.currentPage > surrounding + 2) {
        pages.push({
            number: 2,
            key: shouldShowPageInsteadOfDots ? 2 : -3,
            label: shouldShowPageInsteadOfDots ? '2' : '...',
            enabled: shouldShowPageInsteadOfDots
        })
    }

    // Buttons [n - 3, ..., n + 3]
    for (let i = props.currentPage - surrounding; i <= props.currentPage + surrounding; i++) {
        if (i < 1 || i > props.totalPages) {
            continue
        }

        pages.push({
            number: i,
            key: i,
            label: i.toString(),
            enabled: i !== props.currentPage
        })
    }

    shouldShowPageInsteadOfDots = props.currentPage + surrounding === props.totalPages - 2

    // Dots before last page button
    if (props.currentPage < props.totalPages - surrounding - 1) {
        pages.push({
            number: props.currentPage + surrounding + 1,
            key: shouldShowPageInsteadOfDots ? props.currentPage + surrounding + 1 : -4,
            label: shouldShowPageInsteadOfDots ? (props.currentPage + surrounding + 1).toString() : '...',
            enabled: shouldShowPageInsteadOfDots
        })
    }

    // Last page button
    if (props.currentPage + surrounding < props.totalPages) {
        pages.push({
            number: props.totalPages,
            key: props.totalPages,
            label: props.totalPages.toString(),
            enabled: true
        })
    }

    // Next page button
    pages.push({
        number: props.currentPage + 1,
        key: -2,
        label: 'Następna',
        enabled: props.currentPage !== props.totalPages
    })

    return (
        <nav className='d-flex flex-row flex-nowrap overflow-scroll no-scrollbar'>
            <ul className='pagination'>
                {pages.map(p => (
                    <li key={p.key} className={`page-item ${p.enabled ? '' : ' disabled'}`}>
                        <button className='page-link' onClick={() => props.onPageChanged(p.number)}
                                disabled={!p.enabled}>{p.label}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Object.assign(Pagination, {
    displayName: 'Pagination'
})