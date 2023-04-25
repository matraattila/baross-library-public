import React, { useState } from 'react'
import {
  Table,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  RowData,
  PaginationState,
  createColumnHelper,
  getSortedRowModel,
  SortingFn,
  CellContext,
} from '@tanstack/react-table'
import { Book } from '@/interfaces/Book'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import Button from './ui/Button'
import EditBookModal from './EditBookModal'
import { SortingState } from '@tanstack/react-table'
import { FaRegTrashAlt, FaSortAmountDownAlt, FaSortAmountUp } from 'react-icons/fa'
import { FiEdit2 } from 'react-icons/fi'
import Anchor from './ui/Anchor'
import DeleteBookModal from './DeleteBookModal'
import { motion } from 'framer-motion'
import useApp from '@/hooks/useApp'
import { KeyedMutator } from 'swr'
import { ADMIN, BOOK_API } from '@/lib/constants'
import { TbRefresh } from 'react-icons/tb'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { downloadExcel } from 'react-export-table-to-excel'
import { IoMdDownload } from 'react-icons/io'
import joinClasses from '@/lib/joinClasses'

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

function useSkipper() {
  const shouldSkipRef = React.useRef(true)
  const shouldSkip = shouldSkipRef.current

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false
  }, [])

  React.useEffect(() => {
    shouldSkipRef.current = true
  })

  return [shouldSkip, skip] as const
}

export interface editedBookProps {
  book: Book
  index: number
}

export interface deleteBookProps {
  raktariJel: number
}

declare module '@tanstack/table-core' {
  interface SortingFns {
    sortingForHungarian: SortingFn<Book>
  }
}

function BooksTable({ books, mutate }: { books: Book[]; mutate: KeyedMutator<any> }) {
  const { user } = useApp()
  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })
  const pagination = React.useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])
  const [sorting, setSorting] = useState<SortingState>([])
  const [data, setData] = useState<Book[] | []>(books)
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()
  const [editedBook, setEditedBook] = useState<editedBookProps>({ index: null, book: null })
  const [deleteBook, setDeleteBook] = useState<deleteBookProps>({
    raktariJel: null,
  })

  const columnHelper = createColumnHelper<Book>()
  const columns = React.useMemo<ColumnDef<Book>[]>(
    () => [
      {
        accessorKey: 'raktariJel',
        id: 'raktariJel',
        header: () => <span>Raktári Jel</span>,
      },
      {
        accessorKey: 'cutterSzam',
        id: 'cutterSzam',
        header: () => <span>Cutter Szám</span>,
      },
      {
        accessorKey: 'cim',
        id: 'cim',
        header: () => <span>Cím</span>,
        sortingFn: 'sortingForHungarian',
      },
      {
        accessorKey: 'szerzoiAdatok.szerzo',
        id: 'szerzoiAdatok.szerzo',
        header: () => <span>Szerző</span>,
        sortingFn: 'sortingForHungarian',
      },
      {
        accessorKey: 'megjelenes',
        header: () => <span>Megjelenés</span>,
        sortingFn: 'sortingForHungarian',
      },
      {
        accessorKey: 'kiadas',
        header: () => <span>Kiadás</span>,
      },
      columnHelper.display({
        id: 'actions',
        header: () => <span className="w-full text-center">Műveletek</span>,
        cell: (props: CellContext<Book, Book>) => {
          return (
            <div className="w-full flex justify-center text-inherit">
              <Anchor
                href={'#'}
                tabIndex={-1} // Prevent selection of button with tab
                onClick={() =>
                  setEditedBook({
                    ...editedBook,
                    index: props.row.index,
                    book: data[props.row.index],
                  })
                }
                size={'xl'}
                title="Edit"
              >
                <FiEdit2 />
              </Anchor>
              <Anchor
                href={'#'}
                tabIndex={-1} // Prevent selection of button with tab
                onClick={() =>
                  setDeleteBook({ ...deleteBook, raktariJel: data[props.row.index].raktariJel })
                }
                title="Delete"
              >
                <FaRegTrashAlt />
              </Anchor>
            </div>
          )
        },
      }),
    ],
    [columnHelper, data, deleteBook, editedBook]
  )

  const table = useReactTable({
    data,
    columns,
    sortingFns: {
      sortingForHungarian: (rowA: any, rowB: any, columnId: any): number => {
        const huCollator: Intl.Collator = new Intl.Collator('hu', { sensitivity: 'accent' })
        const rowAValue: string = rowA.getValue(columnId)
        const rowBValue: string = rowB.getValue(columnId)

        return huCollator.compare(rowAValue, rowBValue)
      },
    },
    state: {
      pagination,
      sorting,
      columnVisibility: {
        actions: user.role === ADMIN,
      },
    },
    // manualPagination: true,
    // pageCount: React.useMemo(() => Math.ceil(books.length / pageSize), [books, pageSize]),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    debugTable: true,
  })

  return (
    <>
      <Pagination table={table} withPageSizeSelect />
      <motion.div
        className="grid gap-8 overflow-x-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        {/* Delete book modal */}
        {deleteBook.raktariJel ? (
          <DeleteBookModal
            states={{
              deleteBook,
              setDeleteBook,
              data,
              setData,
              skipAutoResetPageIndex,
            }}
          />
        ) : (
          ''
        )}

        {/* Edit book modal */}
        {editedBook.book ? (
          <EditBookModal
            states={{
              data,
              setData,
              editedBook,
              setEditedBook,
              skipAutoResetPageIndex,
            }}
          />
        ) : (
          ''
        )}

        {/* Table */}
        <table
          onSelect={(e) => (editedBook.book || deleteBook.raktariJel ? e.preventDefault() : '')} // Prevent user from pressing the Edit button
          className={`${
            editedBook.book || deleteBook.raktariJel ? 'pointer-events-none opacity-60' : ''
          } relative min-w-full border-spacing-0 border-collapse text-left transition-opacity duration-300 ease-in-out`}
        >
          <thead className="sticky top-0 bg-primary text-base-100 whitespace-nowrap">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={`${
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none hover:opacity-80'
                          : ''
                      } px-4 py-2`}
                      onClick={() =>
                        header.column.getCanSort() ? header.column.toggleSorting() : undefined
                      }
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center gap-2 bg-primary text-base-100`}
                          title="Sort"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <FaSortAmountDownAlt className="opacity-90" />,
                            desc: <FaSortAmountUp className="opacity-90" />,
                          }[header.column.getIsSorted() as string] ?? null}

                          {/* {flexRender(header.column.columnDef.header, header.getContext())} */}
                          {/* {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null} */}
                        </div>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  id={String(row.getAllCells()[0].getValue())}
                  key={row.id}
                  className={`${
                    editedBook.book || deleteBook.raktariJel
                      ? 'target:bg-primary target:text-base-100'
                      : ''
                  } border-t-2 border-primary/20 bg-base-100/70 scroll-mt-[20vh] transition-colors duration-300`}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="px-4 py-2 max-w-[10em] overflow-hidden whitespace-pre text-ellipsis"
                        title={cell.getValue() as string}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </motion.div>
      <Pagination table={table} data={data} actions={{ mutate }} />
    </>
  )
}

export default BooksTable

export function Pagination({
  table,
  withPageSizeSelect = false,
  actions,
  data,
}: {
  table: Table<Book>
  withPageSizeSelect?: boolean
  actions?: {
    mutate?: KeyedMutator<any>
  }
  data?: Book[]
}): JSX.Element {
  const pageSizeOptions: number[] = [10, 20, 30, 40, 50]
  function handleDownloadExcel() {
    const headers: { id: string; name: string }[] = [
      { id: 'raktariJel', name: 'Raktári Jel' },
      { id: 'cutterSzam', name: 'Cutter Szám' },
      { id: 'cim', name: 'Cím' },
      { id: 'szerzo', name: 'Szerző' },
      { id: 'megjelenes', name: 'Megjelenés' },
      { id: 'kiadas', name: 'Kiadás' },
    ]

    downloadExcel({
      fileName: 'books',
      sheet: 'react-export-table-to-excel',
      tablePayload: {
        header: headers.map((header) => header.name),
        body: data.map((book: Book) => {
          let rowItems = {}

          // Add specific book props to rowItems object based on the corresponding header name
          headers.map((headerName) => {
            switch (headerName.id) {
              case 'szerzo':
                rowItems = { ...rowItems, [headerName.id]: book.szerzoiAdatok.szerzo }
                break
              default:
                rowItems = { ...rowItems, [headerName.id]: book[headerName.id] }
                break
            }
          })

          return rowItems
        }),
      },
    })
  }

  return (
    <div className="mx-auto w-full flex justify-between gap-6 rounded-2xl">
      <div className="flex items-center gap-5">
        <Button
          onClick={() => {
            table.previousPage()
            window.scrollTo(0, 0)
          }}
          disabled={!table.getCanPreviousPage()}
          className="disabled:cursor-not-allowed"
        >
          <AiOutlineArrowLeft className="text-lg" />
          Previous
        </Button>
        <p className="text-lg select-none whitespace-nowrap">
          Page
          <strong className="px-1">
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </p>
        <Button
          onClick={() => {
            table.nextPage()
            window.scrollTo(0, 0)
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
          <AiOutlineArrowRight className="text-lg" />
        </Button>
      </div>

      {withPageSizeSelect ? (
        <Menu as="div" className="relative inline-block text-left max-w-fit justify-self-end">
          <div>
            <Menu.Button className="inline-flex w-full justify-center items-center rounded-md bg-primary px-4 py-2 text-base font-medium text-base-100 shadow-sm focus:outline-none focus:outline-2 focus:outline-primary focus:outline-offset-2">
              {table.getState().pagination.pageSize}
              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-md bg-white shadow-lg focus:outline-none">
              <div className="py-1">
                {pageSizeOptions.map((size) => (
                  <Menu.Item key={size}>
                    <a
                      href="#"
                      className={joinClasses(
                        size === table.getState().pagination.pageSize
                          ? 'bg-primary text-base-100'
                          : 'text-gray-700',
                        'block px-4 py-2 text-base text-center '
                      )}
                      onClick={() => table.setPageSize(Number(size))}
                    >
                      {size}
                    </a>
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : null}

      {actions ? (
        <div className="flex gap-4">
          <Button
            onClick={handleDownloadExcel}
            className="block justify-self-center max-w-fit"
            fontSize="xl"
            title="Download books in excel document format"
          >
            <IoMdDownload />
          </Button>
          <Button
            onClick={() => actions.mutate(BOOK_API)}
            className="hidden sm:flex font-bold"
            title="Refresh"
          >
            <TbRefresh className="font-bold text-2xl" />
          </Button>
        </div>
      ) : null}
    </div>
  )
}

// function Filter({ column, table }: { column: Column<any, any>; table: Table<any> }) {
//   const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

//   const columnFilterValue = column.getFilterValue()

//   return typeof firstValue === 'number' ? (
//     <div className="flex space-x-2">
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[0] ?? ''}
//         onChange={(e) =>
//           column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])
//         }
//         placeholder={`Min`}
//         className="w-24 border shadow rounded"
//       />
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[1] ?? ''}
//         onChange={(e) =>
//           column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])
//         }
//         placeholder={`Max`}
//         className="w-24 border shadow rounded"
//       />
//     </div>
//   ) : (
//     <input
//       type="text"
//       value={(columnFilterValue ?? '') as string}
//       onChange={(e) => column.setFilterValue(e.target.value)}
//       placeholder={`Search...`}
//       className="w-36 border shadow rounded"
//     />
//   )
// }
