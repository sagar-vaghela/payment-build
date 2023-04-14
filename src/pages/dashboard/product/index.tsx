import React, { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import type { Page as PageType } from 'src/types/page';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { productVisibleAPI, productsListAPI } from 'src/services/api';
import { useAuth } from 'src/hooks/use-auth';
import { Scrollbar } from 'src/components/scrollbar';
import { Menu, MenuItem, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Box, Card, Modal, Typography } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Container, Stack } from '@mui/system';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { toast } from 'react-hot-toast';
import EditProduct from './EditProduct';
import EliminateProduct from './EliminateProduct';
import { Product } from '../../../types/product.types';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    zIndex: 5
};

const Page: PageType = () => {

    const [productActiveList, setProductActiveList] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortKey, setSortKey] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openModal, setOpenModal] = useState(false);
    const [getTableData, setGetTableData] = useState(true);
    const [modalBody, setModalBody] = useState('');
    const [moreActionRow, setMoreActionRow] = useState<Product>({} as Product);


    const open = Boolean(anchorEl);
    const auth = useAuth();

    useEffect(() => {

        const callApi = async () => {
            const productsList = await productsListAPI('active');

            let productData: any = [];

            let totalData = productsList.data;
            totalData.forEach((element: Product) => {
                const convriosn = element.ventas && element.clicks ? element.ventas / element.clicks : null;
                element = { ...element, conversion: convriosn }
                productData.push(element);
            });

            setProductActiveList(productData);
            setGetTableData(false);
        };
        if (getTableData) {
            callApi();
        }

    }, [auth.token.access_token, getTableData]);

    const tableHeader = [

        { key: 'nombre', label: 'Name' },
        { key: 'clicks', label: 'Clicks' },
        { key: 'ventas', label: 'Sales' },
        { key: 'conversion', label: 'Conversion' },
        { key: 'totalvendido', label: 'Total' },
        { key: 'fechacadText', label: 'Expiration date' },
        { key: 'numNewsClients', label: 'New clients' },
        { key: 'tipo_docid', label: 'Guy' },
        { key: 'precio', label: 'Price' },
        { key: 'visible', label: 'Visible' },
        { key: 'action', label: '' },
    ]

    const sortData = (key: string, subKey: string) => {
        const order = sortOrder === 'asc' ? 'desc' : 'asc';
        const sorted = [...productActiveList].sort((a, b) => {

            if (subKey) {
                if (a[key][subKey] < b[key][subKey]) {
                    return order === 'asc' ? -1 : 1;
                }
                if (a[key][subKey] > b[key][subKey]) {
                    return order === 'asc' ? 1 : -1;
                }
            } else {
                if (a[key] < b[key]) {
                    return order === 'asc' ? -1 : 1;
                }
                if (a[key] > b[key]) {
                    return order === 'asc' ? 1 : -1;
                }
            }
            return 0;
        });
        setProductActiveList(sorted);
        setSortOrder(order);
        setSortKey(key);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, item: Product) => {
        setAnchorEl(event.currentTarget);
        setMoreActionRow(item);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setAnchorEl(null);
    }

    const handleEdit = () => {
        setOpenModal(true);
        setModalBody('edit');
    };

    const handleEliminate = () => {
        setOpenModal(true);
        setModalBody('eliminate');
    };

    const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleVisible = async (item: Product) => {
        const payload = {
            pid: item.uid,
            visible: !item.visible
        }
        const visible: any = await productVisibleAPI(payload);
        if (visible.status === 200) {
            setGetTableData(visible.data);
            toast.success('Deleted successfully');
        }
    };

    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 6,
                    position: 'relative'
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={4}>
                        <Card>
                            <Scrollbar>
                                <Table sx={{ minWidth: 700 }}>
                                    <TableHead>
                                        <TableRow>
                                            {
                                                tableHeader.map((item, i) => {

                                                    if (item.label === 'Name') {
                                                        return (
                                                            <TableCell key={i}>
                                                                <span className='cursor-pointer'
onClick={() => { setSortKey(item.key); sortData(item.key, 'en_EN') }}>
                                                                    {item.label}{sortKey === item.key &&
                                                                        <span className='cursor-pointer'>{sortOrder === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>}
                                                                </span>
                                                            </TableCell>
                                                        )
                                                    }
                                                    else {
                                                        return (
                                                            <TableCell key={i}>
                                                                <span className='cursor-pointer'
onClick={() => { setSortKey(item.key); sortData(item.key, '') }}>
                                                                    {item.label}{sortKey === item.key &&
                                                                        <span className='cursor-pointer'>{sortOrder === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>}
                                                                </span>
                                                            </TableCell>
                                                        )
                                                    }
                                                })
                                            }
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {productActiveList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: Product, index: number) => {
                                            return (
                                                <TableRow key={index}
hover>

                                                    <TableCell>
                                                        {item.nombre.en_EN}
                                                    </TableCell>

                                                    <TableCell>
                                                        {item.clicks}
                                                    </TableCell>

                                                    <TableCell>
                                                        {item.ventas}
                                                    </TableCell>

                                                    <TableCell>
                                                        {<>{Math.round((item.conversion as number) * 100)}%</>}
                                                    </TableCell>

                                                    <TableCell>
                                                        {(item.totalvendido as number).toFixed(2)}
                                                    </TableCell>

                                                    <TableCell>
                                                        {item.fechacadText ? item.fechacadText : '--'}
                                                    </TableCell>

                                                    <TableCell>
                                                        {item.numNewsClients}
                                                    </TableCell>

                                                    <TableCell>
                                                        {item.tipo_docid}
                                                    </TableCell>

                                                    <TableCell>
                                                        {item.precio}
                                                    </TableCell>

                                                    <TableCell >
                                                        <span onClick={() => handleVisible(item)}>{item.visible ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}</span>
                                                    </TableCell>

                                                    <TableCell align='center'>
                                                        <span onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleClick(event, item)}><MoreVertIcon /></span>
                                                        <Menu
                                                            id="basic-menu"
                                                            anchorEl={anchorEl}
                                                            open={open}
                                                            onClose={handleClose}
                                                            MenuListProps={{
                                                                'aria-labelledby': 'basic-button',
                                                            }}
                                                        >
                                                            <MenuItem onClick={handleEdit}>Edit</MenuItem>
                                                            <MenuItem onClick={handleEliminate}>Eliminate</MenuItem>
                                                        </Menu>

                                                    </TableCell>

                                                </TableRow>
                                            )
                                        })
                                        }
                                    </TableBody>
                                </Table>
                            </Scrollbar>

                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
                                component="div"
                                count={productActiveList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />

                        </Card>
                    </Stack>
                </Container>
            </Box>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {modalBody === 'edit' ?
                        <EditProduct moreActionRow={moreActionRow} /> :
                        <EliminateProduct moreActionRow={moreActionRow} />}
                </Box>
            </Modal>
        </>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;