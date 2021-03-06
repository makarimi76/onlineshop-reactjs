import MaterialTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'

const Table = ({ head, body, pagination}) => {

    return (
        <>
            <TableContainer>
                <MaterialTable stickyHeader>
                    <TableHead>
                        {head}
                    </TableHead>
                    <TableBody>
                        {body}
                    </TableBody>
                </MaterialTable>
            </TableContainer>

            {pagination &&
                <TablePagination
                    rowsPerPageOptions={pagination.rowsPerPageOptions}
                    component="div"
                    count={pagination.totalCount}
                    rowsPerPage={pagination.rowsPerPage}
                    page={pagination.page}
                    onChangePage={pagination.handleChangePage}
                    onChangeRowsPerPage={pagination.handleChangeRowsPerPage}
                    labelDisplayedRows={({ from, to, count, page }) => {
                        return (
                            <>
                                صفحه {page + 1} از {Math.ceil(count / pagination.rowsPerPage)}
                            </>
                        )
                    }}
                    labelRowsPerPage="تعداد در هر صفحه"
                />
            }

        </>
    )
}

export default Table