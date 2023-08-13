import { useState, useEffect, ChangeEvent } from "react";

import "./App.css";
import { Container, Button, Table, Form, Alert } from "react-bootstrap";
import TableRow from "./interfaces/tableRow";

function App() {
  const [table, setTable] = useState<TableRow[]>([]);
  const [grandTotal, setGrandTotal] = useState(0);
  console.log(table);
  useEffect(() => {
    editGrandTotalValue();
  });
  const addRow = () => {
    setTable((currentTable) => [
      ...currentTable,
      {
        productName: "",
        productPrice: 0,
        qty: 1,
        total: 0,
      },
    ]);
  };
  const deleteRow = (idx: number) => {
    setTable((currentTable) => {
      const newTable = [...currentTable];
      newTable.splice(idx, 1);
      return newTable;
    });
  };
  const editValue = (name: string, value: string, idx: number) => {
    setTable((currentTable) =>
      currentTable.map((row, rowIdx) =>
        rowIdx === idx ? { ...row, [name]: value } : row
      )
    );
  };
  const editTotalValue = (idx: number) => {
    setTable((currentTable) =>
      currentTable.map((row, rowIdx) =>
        rowIdx === idx ? { ...row, total: row.qty * row.productPrice } : row
      )
    );
  };
  const editGrandTotalValue = () => {
    const tableTotals = table.map((row) => row.total);
    setGrandTotal(tableTotals.reduce((a, c) => a + c, 0));
  };
  return (
    <>
      <Container>
        <div>
          <div className="my-5">
            <Button variant="success" className="btn-lg" onClick={addRow}>
              Tambah baru
            </Button>
          </div>
          <div>
            {table.length > 0 ? (
              <Table>
                <tbody>
                  {table.map((row, idx) => (
                    <tr key={idx}>
                      <td>
                        <Form.Group>
                          <Form.Label>Product name</Form.Label>
                          <Form.Control
                            id="productName"
                            name="productName"
                            value={row.productName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              editValue(e.target.name, e.target.value, idx)
                            }
                          />
                        </Form.Group>
                      </td>
                      <td>
                        <Form.Group>
                          <Form.Label>Product price</Form.Label>
                          <Form.Control
                            type="number"
                            min={0}
                            id="productPrice"
                            name="productPrice"
                            value={row.productPrice}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              editValue(e.target.name, e.target.value, idx);
                              editTotalValue(idx);
                              // editGrandTotalValue();
                            }}
                          />
                        </Form.Group>
                      </td>
                      <td>
                        <Form.Group>
                          <Form.Label>Qty</Form.Label>
                          <Form.Control
                            type="number"
                            min={0}
                            id="qty"
                            name="qty"
                            value={row.qty}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              editValue(e.target.name, e.target.value, idx);
                              editTotalValue(idx);
                              // editGrandTotalValue();
                            }}
                          />
                        </Form.Group>
                      </td>
                      <td>
                        <Form.Group>
                          <Form.Label>Total</Form.Label>
                          <Form.Control
                            type="number"
                            min={0}
                            id="total"
                            name="total"
                            value={row.total}
                            disabled
                          />
                        </Form.Group>
                      </td>
                      <td>
                        <Form.Group>
                          <Button
                            type="button"
                            variant="danger"
                            onClick={() => deleteRow(idx)}
                          >
                            Hapus
                          </Button>
                        </Form.Group>
                      </td>
                    </tr>
                  ))}
                </tbody>

                {/* Grand total */}
                <tfoot>
                  <tr>
                    <td colSpan={3} align="right">
                      Grand Total
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Control
                          id="grandTotal"
                          name="grandTotal"
                          value={grandTotal}
                          disabled
                        />
                      </Form.Group>
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </Table>
            ) : (
              <Alert>
                Belum ada produk yang ditambahkan, silakan klik Tambah Baru
              </Alert>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

export default App;
