import { filter } from 'lodash';
import { Icon } from '@iconify/react';
// import { sentenceCase } from 'change-case';
import { useState } from 'react';
// import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../components/_dashboard/user';
//
import USERLIST from '../_mocks_/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'rank', label: '랭킹', alignRight: false },
    { id: 'name', label: '이름', alignRight: false },
    { id: 'company', label: '소속', alignRight: false },
    { id: 'role', label: '직무', alignRight: false },
    { id: 'isVerified', label: '독후감', alignRight: false },
    { id: 'amount', label: '대출권수', alignRight: false },
    { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b) {
    if (b['amount'] < a['amount']) {
        return -1;
    }
    if (b['amount'] > a['amount']) {
        return 1;
    }
    return 0;
}

function getComparator(order) {
    // return func
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b)
        : (a, b) => -descendingComparator(a, b);
}
// USERLIST, getComparator(order, orderBy) => (a, b) => descendingComparator(a, b, orderBy), filterName
function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1]; // using index => if equal, auto descending
    });
    if (query) {
        return filter(
            array,
            // name에서 query가 있는 모든 user 반환!
            (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }
    return stabilizedThis.map((el) => el[0]);
}

const goUserDetail = (event) => {
    console.log(event.target)
}

export default function User() {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('desc');
    // const [selected, setSelected] = useState([]);
    // const [orderBy, setOrderBy] = useState('amount');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // const handleRequestSort = (event, property) => {
    //     const isAsc = orderBy === property && order === 'asc';
    //     setOrder(isAsc ? 'desc' : 'asc');
    //     setOrderBy(property);
    // };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

    const filteredUsers = applySortFilter(USERLIST, getComparator(order), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    return (
        <Page title="User | Minimal-UI">
            <Container>
                <Typography variant="h4" gutterBottom>
                    우리부대의 독서왕은?
                </Typography>
                <Card>
                    <UserListToolbar
                        // numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                    />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    // orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={USERLIST.length}
                                    // onRequestSort={handleRequestSort}
                                    // onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, idx) => {
                                            const {
                                                id,
                                                name,
                                                role,
                                                amount,
                                                company,
                                                avatarUrl,
                                                isVerified,
                                            } = row;
                                            const rank = page * rowsPerPage + (idx + 1);
                                            // const isItemSelected = selected.indexOf(name) !== -1;

                                            return (
                                                <TableRow
                                                    hover
                                                    key={id}
                                                    tabIndex={-1}
                                                    role="checkbox"
                                                    // selected={isItemSelected}
                                                    // aria-checked={isItemSelected}
                                                >
                                                    <TableCell align="left">{rank}</TableCell>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        <Stack
                                                            direction="row"
                                                            alignItems="center"
                                                            spacing={2}
                                                        >
                                                            <Avatar alt={name} src={avatarUrl} />
                                                            <Typography variant="subtitle2" noWrap>
                                                                {name}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell align="left">{company}</TableCell>
                                                    <TableCell align="left">{role}</TableCell>
                                                    <TableCell align="left">
                                                        {isVerified ? 'Yes' : 'No'}
                                                    </TableCell>
                                                    <TableCell align="left">{amount}</TableCell>

                                                    <TableCell align="center" onClick={goUserDetail}>
                                                        <Icon
                                                            icon="akar-icons:arrow-right"
                                                            width={20}
                                                            height={20}
                                                            
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                {isUserNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <SearchNotFound searchQuery={filterName} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={USERLIST.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>
        </Page>
    );
}

// <Button
//     variant="contained"
//     component={RouterLink}
//     to="#"
//     startIcon={<Icon icon={plusFill} />}
//     >
//     New User
// </Button>
// const handleSelectAllClick = (event) => {
// if (event.target.checked) {
// const newSelecteds = USERLIST.map((n) => n.name);
// setSelected(newSelecteds);
// return;
//
//setSelected([]);
// };
// const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];
//     if (selectedIndex === -1) {
//         newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//         newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//         newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//         newSelected = newSelected.concat(
//             selected.slice(0, selectedIndex),
//             selected.slice(selectedIndex + 1)
//         );
//     }
//     setSelected(newSelected);
// };
// <Checkbox
// checked={isItemSelected}
// onChange={(event) =>
//     handleClick(event, name)
// }
// />