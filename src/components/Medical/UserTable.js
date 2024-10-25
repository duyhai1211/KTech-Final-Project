import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from 'react-bootstrap/Button';
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { useFetchUser } from '../services/useFetchUser';

const paginationModel = { page: 0, pageSize: 10 };

const UserTable = () => {
    const { listUser, error, isLoading } = useFetchUser()
    const handleEdit = (row) => {
        console.log("Edit user:", row);
    };
    const handleDelete = (row) => {
        console.log("Delete user:", row);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'username', headerName: 'User Name', width: 130 },
        {
            field: 'role',
            headerName: 'ROLE',
            type: 'string',
            width: 90,
        },
        { field: 'email', headerName: 'Email', width: 210 },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 130,
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        onClick={() => handleEdit(params.row)}
                        sx={{ marginRight: 1 }}
                    >
                        <MdEdit size={20} />
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => handleDelete(params.row)}
                    >
                        <MdDeleteForever size={20} />
                    </Button>
                </>
            ),
        },
    ];
    return (
        <Paper sx={{ height: 500, width: '100%' }}>
            {isLoading ? (
                <div>Loading data...</div>
            ) : error ? (
                <div>Something went wrong: {error}</div>
            ) : (
                <DataGrid
                    rows={listUser ? listUser : []}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[10, 15]}
                    checkboxSelection
                    sx={{ border: 0 }}
                    components={{
                        NoRowsOverlay: () => <div>No data available</div>, // Custom no data message
                    }}
                />)}
        </Paper>


    )
}
export default UserTable