"use client"

import { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useBoxes } from "@/hooks/useBoxes";
import { useCards } from "@/hooks/useCards";
import { useColors } from "@/hooks/useColors";
import { useMolds } from "@/hooks/useMolds";
import { useScents } from "@/hooks/useScents";
import { Loader2, Pencil, Trash2, Plus } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";

const TABS = [
  { key: "box", label: "Hộp Đựng" },
  { key: "card", label: "Thiệp Tặng" },
  { key: "color", label: "Màu Nến" },
  { key: "mold", label: "Khuôn Nến" },
  { key: "scent", label: "Mùi Hương" },
  { key: "product", label: "Sản phẩm có sẵn" }, // Thêm tab Product
  { key: "category", label: "Danh Mục" },
];

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

function BoxAdmin() {
  const options = useMemo(() => ({}), []);
  const { boxes, isLoading, error, createBox, updateBox, deleteBox, fetchBoxes } = useBoxes(options);
  // Fetch categories for Box (entityType=1)
  const categoryOptions = useMemo(() => ({ entityType: 1, limit: 100 }), []);
  const { categories: boxCategories } = useCategories(categoryOptions);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<null | typeof boxes[0]>(null);
  const [form, setForm] = useState<Omit<typeof boxes[0], 'id'> & { id?: number }>({
    name: "", description: "", material: "", size: "", capacity: "", cost: "", img_url: "", categoryId: 0
  });
  const handleOpen = (item: typeof boxes[0] | null) => {
    setEdit(item);
    setForm(item ? { ...item } : { name: "", description: "", material: "", size: "", capacity: "", cost: "", img_url: "", categoryId: 0 });
    setOpen(true);
  };
  const handleSave = async () => {
    if (edit) await updateBox(edit.id, { ...form, categoryId: Number(form.categoryId) });
    else await createBox({ ...form, categoryId: Number(form.categoryId) });
    await fetchBoxes();
    setOpen(false);
  };
  const handleDelete = async (id: number) => {
    await deleteBox(id);
    await fetchBoxes();
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Danh sách Hộp Đựng</h2>
        <Button onClick={() => handleOpen(null)} className="gap-2"><Plus className="w-4 h-4" /> Thêm mới</Button>
      </div>
      {isLoading && <div className="flex justify-center py-8"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="overflow-x-auto rounded-lg border shadow-sm bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Chất liệu</TableHead>
              <TableHead>Kích thước</TableHead>
              <TableHead>Sức chứa</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Ảnh</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {boxes.map((b, idx) => (
              <TableRow key={`${b.id}-${idx}`} className="hover:bg-muted/50">
                <TableCell>{b.id}</TableCell>
                <TableCell>{b.name}</TableCell>
                <TableCell className="max-w-[180px] truncate">{b.description}</TableCell>
                <TableCell>{b.material}</TableCell>
                <TableCell>{b.size}</TableCell>
                <TableCell>{b.capacity}</TableCell>
                <TableCell>{b.cost}</TableCell>
                <TableCell><img src={b.img_url} alt="img" className="w-12 h-12 object-cover rounded" /></TableCell>
                <TableCell>{b.categoryId}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={() => handleOpen(b)}><Pencil className="w-4 h-4" /></Button>
                    <Button size="icon" variant="destructive" onClick={() => handleDelete(b.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg mx-auto">
          <DialogHeader><DialogTitle>{edit ? "Sửa" : "Thêm mới"} Hộp Đựng</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <Input placeholder="Tên" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <Textarea placeholder="Mô tả" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            <Input placeholder="Chất liệu" value={form.material} onChange={e => setForm(f => ({ ...f, material: e.target.value }))} />
            <Input placeholder="Kích thước" value={form.size} onChange={e => setForm(f => ({ ...f, size: e.target.value }))} />
            <Input placeholder="Sức chứa" value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))} />
            <Input placeholder="Giá" value={form.cost} onChange={e => setForm(f => ({ ...f, cost: e.target.value }))} />
            <div className="flex gap-2 items-center">
              <Input placeholder="Ảnh (URL)" value={form.img_url} onChange={e => setForm(f => ({ ...f, img_url: e.target.value }))} />
              <input
                type="file"
                accept="image/*"
                id="box-image-upload"
                style={{ display: 'none' }}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const formData = new FormData();
                  formData.append('file', file);
                  formData.append('upload_preset', 'bmchien1');
                  // Có thể thêm folder nếu muốn: formData.append('folder', 'Root');
                  try {
                    const res = await fetch('https://api.cloudinary.com/v1_1/dukap4zei/image/upload', {
                      method: 'POST',
                      body: formData,
                    });
                    const data = await res.json();
                    if (data.secure_url) {
                      setForm(f => ({ ...f, img_url: data.secure_url }));
                    } else {
                      alert('Upload thất bại!');
                    }
                  } catch (err) {
                    alert('Lỗi upload ảnh!');
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById('box-image-upload')?.click()}>
                Tải ảnh lên Cloudinary
              </Button>
            </div>
            <div>
              <label className="block mb-1">Danh mục</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={form.categoryId}
                onChange={e => setForm(f => ({ ...f, categoryId: Number(e.target.value) }))}
              >
                <option value={0}>Chọn danh mục</option>
                {boxCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <Button onClick={handleSave}>{edit ? "Lưu" : "Thêm"}</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>Huỷ</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Các component tương tự cho Card, Color, Mold, Scent
function CardAdmin() {
  const options = useMemo(() => ({}), []);
  const { cards, isLoading, error, createCard, updateCard, deleteCard, fetchCards } = useCards(options);
  // Fetch categories for Card (entityType=2)
  const categoryOptions = useMemo(() => ({ entityType: 2, limit: 100 }), []);
  const { categories: cardCategories } = useCategories(categoryOptions);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<null | typeof cards[0]>(null);
  const [form, setForm] = useState<Omit<typeof cards[0], 'id'> & { id?: number }>({
    name: "", description: "", material: "", size: "", design: "", cost: "", img_url: "", categoryId: 0
  });
  const handleOpen = (item: typeof cards[0] | null) => {
    setEdit(item);
    setForm(item ? { ...item } : { name: "", description: "", material: "", size: "", design: "", cost: "", img_url: "", categoryId: 0 });
    setOpen(true);
  };
  const handleSave = async () => {
    if (edit) await updateCard(edit.id, { ...form, categoryId: Number(form.categoryId) });
    else await createCard({ ...form, categoryId: Number(form.categoryId) });
    await fetchCards();
    setOpen(false);
  };
  const handleDelete = async (id: number) => {
    await deleteCard(id);
    await fetchCards();
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Danh sách Thiệp Tặng</h2>
        <Button onClick={() => handleOpen(null)} className="gap-2"><Plus className="w-4 h-4" /> Thêm mới</Button>
      </div>
      {isLoading && <div className="flex justify-center py-8"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="overflow-x-auto rounded-lg border shadow-sm bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Chất liệu</TableHead>
              <TableHead>Kích thước</TableHead>
              <TableHead>Thiết kế</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Ảnh</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cards.map((c, idx) => (
              <TableRow key={`${c.id}-${idx}`} className="hover:bg-muted/50">
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell className="max-w-[180px] truncate">{c.description}</TableCell>
                <TableCell>{c.material}</TableCell>
                <TableCell>{c.size}</TableCell>
                <TableCell>{c.design}</TableCell>
                <TableCell>{c.cost}</TableCell>
                <TableCell><img src={c.img_url} alt="img" className="w-12 h-12 object-cover rounded" /></TableCell>
                <TableCell>{c.categoryId}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={() => handleOpen(c)}><Pencil className="w-4 h-4" /></Button>
                    <Button size="icon" variant="destructive" onClick={() => handleDelete(c.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg mx-auto">
          <DialogHeader><DialogTitle>{edit ? "Sửa" : "Thêm mới"} Thiệp Tặng</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <Input placeholder="Tên" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <Textarea placeholder="Mô tả" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            <Input placeholder="Chất liệu" value={form.material} onChange={e => setForm(f => ({ ...f, material: e.target.value }))} />
            <Input placeholder="Kích thước" value={form.size} onChange={e => setForm(f => ({ ...f, size: e.target.value }))} />
            <Input placeholder="Thiết kế" value={form.design} onChange={e => setForm(f => ({ ...f, design: e.target.value }))} />
            <Input placeholder="Giá" value={form.cost} onChange={e => setForm(f => ({ ...f, cost: e.target.value }))} />
            <div className="flex gap-2 items-center">
              <Input placeholder="Ảnh (URL)" value={form.img_url} onChange={e => setForm(f => ({ ...f, img_url: e.target.value }))} />
              <input
                type="file"
                accept="image/*"
                id="card-image-upload"
                style={{ display: 'none' }}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const formData = new FormData();
                  formData.append('file', file);
                  formData.append('upload_preset', 'bmchien1');
                  try {
                    const res = await fetch('https://api.cloudinary.com/v1_1/dukap4zei/image/upload', {
                      method: 'POST',
                      body: formData,
                    });
                    const data = await res.json();
                    if (data.secure_url) {
                      setForm(f => ({ ...f, img_url: data.secure_url }));
                    } else {
                      alert('Upload thất bại!');
                    }
                  } catch (err) {
                    alert('Lỗi upload ảnh!');
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById('card-image-upload')?.click()}>
                Tải ảnh lên Cloudinary
              </Button>
            </div>
            <div>
              <label className="block mb-1">Danh mục</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={form.categoryId}
                onChange={e => setForm(f => ({ ...f, categoryId: Number(e.target.value) }))}
              >
                <option value={0}>Chọn danh mục</option>
                {cardCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <Button onClick={handleSave}>{edit ? "Lưu" : "Thêm"}</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>Huỷ</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ColorAdmin() {
  const options = useMemo(() => ({}), []);
  const { colors, isLoading, error, createColor, updateColor, deleteColor, fetchColors } = useColors(options);
  // Fetch categories for Color (entityType=3)
  const categoryOptions = useMemo(() => ({ entityType: 3, limit: 100 }), []);
  const { categories: colorCategories } = useCategories(categoryOptions);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<null | typeof colors[0]>(null);
  const [form, setForm] = useState<Omit<typeof colors[0], 'id'> & { id?: number }>({
    name: "", description: "", material: "", img_url: "", categoryId: 0
  });
  const handleOpen = (item: typeof colors[0] | null) => {
    setEdit(item);
    setForm(item ? { ...item } : { name: "", description: "", material: "", img_url: "", categoryId: 0 });
    setOpen(true);
  };
  const handleSave = async () => {
    if (edit) await updateColor(edit.id, { ...form, categoryId: Number(form.categoryId) });
    else await createColor({ ...form, categoryId: Number(form.categoryId) });
    await fetchColors();
    setOpen(false);
  };
  const handleDelete = async (id: number) => {
    await deleteColor(id);
    await fetchColors();
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Danh sách Màu Nến</h2>
        <Button onClick={() => handleOpen(null)} className="gap-2"><Plus className="w-4 h-4" /> Thêm mới</Button>
      </div>
      {isLoading && <div className="flex justify-center py-8"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="overflow-x-auto rounded-lg border shadow-sm bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Chất liệu</TableHead>
              <TableHead>Ảnh</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {colors.map((c, idx) => (
              <TableRow key={`${c.id}-${idx}`} className="hover:bg-muted/50">
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell className="max-w-[180px] truncate">{c.description}</TableCell>
                <TableCell>{c.material}</TableCell>
                <TableCell><img src={c.img_url} alt="img" className="w-12 h-12 object-cover rounded" /></TableCell>
                <TableCell>{c.categoryId}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={() => handleOpen(c)}><Pencil className="w-4 h-4" /></Button>
                    <Button size="icon" variant="destructive" onClick={() => handleDelete(c.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg mx-auto">
          <DialogHeader><DialogTitle>{edit ? "Sửa" : "Thêm mới"} Màu Nến</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <Input placeholder="Tên" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <Textarea placeholder="Mô tả" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            <Input placeholder="Chất liệu" value={form.material} onChange={e => setForm(f => ({ ...f, material: e.target.value }))} />
            <div className="flex gap-2 items-center">
              <Input placeholder="Ảnh (URL)" value={form.img_url} onChange={e => setForm(f => ({ ...f, img_url: e.target.value }))} />
              <input
                type="file"
                accept="image/*"
                id="color-image-upload"
                style={{ display: 'none' }}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const formData = new FormData();
                  formData.append('file', file);
                  formData.append('upload_preset', 'bmchien1');
                  try {
                    const res = await fetch('https://api.cloudinary.com/v1_1/dukap4zei/image/upload', {
                      method: 'POST',
                      body: formData,
                    });
                    const data = await res.json();
                    if (data.secure_url) {
                      setForm(f => ({ ...f, img_url: data.secure_url }));
                    } else {
                      alert('Upload thất bại!');
                    }
                  } catch (err) {
                    alert('Lỗi upload ảnh!');
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById('color-image-upload')?.click()}>
                Tải ảnh lên Cloudinary
              </Button>
            </div>
            <div>
              <label className="block mb-1">Danh mục</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={form.categoryId}
                onChange={e => setForm(f => ({ ...f, categoryId: Number(e.target.value) }))}
              >
                <option value={0}>Chọn danh mục</option>
                {colorCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <Button onClick={handleSave}>{edit ? "Lưu" : "Thêm"}</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>Huỷ</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MoldAdmin() {
  const options = useMemo(() => ({}), []);
  const { molds, isLoading, error, createMold, updateMold, deleteMold, fetchMolds } = useMolds(options);
  // Fetch categories for Mold (entityType=4)
  const categoryOptions = useMemo(() => ({ entityType: 4, limit: 100 }), []);
  const { categories: moldCategories } = useCategories(categoryOptions);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<null | typeof molds[0]>(null);
  const [form, setForm] = useState<Omit<typeof molds[0], 'id'> & { id?: number }>({
    name: "", description: "", material: "", size: "", capacity: "", cost: "", img_url: "", categoryId: 0
  });
  const handleOpen = (item: typeof molds[0] | null) => {
    setEdit(item);
    setForm(item ? { ...item } : { name: "", description: "", material: "", size: "", capacity: "", cost: "", img_url: "", categoryId: 0 });
    setOpen(true);
  };
  const handleSave = async () => {
    if (edit) await updateMold(edit.id, { ...form, categoryId: Number(form.categoryId) });
    else await createMold({ ...form, categoryId: Number(form.categoryId) });
    await fetchMolds();
    setOpen(false);
  };
  const handleDelete = async (id: number) => {
    await deleteMold(id);
    await fetchMolds();
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Danh sách Khuôn Nến</h2>
        <Button onClick={() => handleOpen(null)} className="gap-2"><Plus className="w-4 h-4" /> Thêm mới</Button>
      </div>
      {isLoading && <div className="flex justify-center py-8"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="overflow-x-auto rounded-lg border shadow-sm bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Chất liệu</TableHead>
              <TableHead>Kích thước</TableHead>
              <TableHead>Sức chứa</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Ảnh</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {molds.map((m, idx) => (
              <TableRow key={`${m.id}-${idx}`} className="hover:bg-muted/50">
                <TableCell>{m.id}</TableCell>
                <TableCell>{m.name}</TableCell>
                <TableCell className="max-w-[180px] truncate">{m.description}</TableCell>
                <TableCell>{m.material}</TableCell>
                <TableCell>{m.size}</TableCell>
                <TableCell>{m.capacity}</TableCell>
                <TableCell>{m.cost}</TableCell>
                <TableCell><img src={m.img_url} alt="img" className="w-12 h-12 object-cover rounded" /></TableCell>
                <TableCell>{m.categoryId}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={() => handleOpen(m)}><Pencil className="w-4 h-4" /></Button>
                    <Button size="icon" variant="destructive" onClick={() => handleDelete(m.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg mx-auto">
          <DialogHeader><DialogTitle>{edit ? "Sửa" : "Thêm mới"} Khuôn Nến</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <Input placeholder="Tên" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <Textarea placeholder="Mô tả" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            <Input placeholder="Chất liệu" value={form.material} onChange={e => setForm(f => ({ ...f, material: e.target.value }))} />
            <Input placeholder="Kích thước" value={form.size} onChange={e => setForm(f => ({ ...f, size: e.target.value }))} />
            <Input placeholder="Sức chứa" value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))} />
            <Input placeholder="Giá" value={form.cost} onChange={e => setForm(f => ({ ...f, cost: e.target.value }))} />
            <div className="flex gap-2 items-center">
              <Input placeholder="Ảnh (URL)" value={form.img_url} onChange={e => setForm(f => ({ ...f, img_url: e.target.value }))} />
              <input
                type="file"
                accept="image/*"
                id="mold-image-upload"
                style={{ display: 'none' }}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const formData = new FormData();
                  formData.append('file', file);
                  formData.append('upload_preset', 'bmchien1');
                  try {
                    const res = await fetch('https://api.cloudinary.com/v1_1/dukap4zei/image/upload', {
                      method: 'POST',
                      body: formData,
                    });
                    const data = await res.json();
                    if (data.secure_url) {
                      setForm(f => ({ ...f, img_url: data.secure_url }));
                    } else {
                      alert('Upload thất bại!');
                    }
                  } catch (err) {
                    alert('Lỗi upload ảnh!');
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById('mold-image-upload')?.click()}>
                Tải ảnh lên Cloudinary
              </Button>
            </div>
            <div>
              <label className="block mb-1">Danh mục</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={form.categoryId}
                onChange={e => setForm(f => ({ ...f, categoryId: Number(e.target.value) }))}
              >
                <option value={0}>Chọn danh mục</option>
                {moldCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <Button onClick={handleSave}>{edit ? "Lưu" : "Thêm"}</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>Huỷ</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ScentAdmin() {
  const options = useMemo(() => ({}), []);
  const { scents, isLoading, error, createScent, updateScent, deleteScent, fetchScents } = useScents(options);
  // Fetch categories for Scent (entityType=5)
  const categoryOptions = useMemo(() => ({ entityType: 5, limit: 100 }), []);
  const { categories: scentCategories } = useCategories(categoryOptions);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<null | typeof scents[0]>(null);
  const [form, setForm] = useState<Omit<typeof scents[0], 'id'> & { id?: number }>({
    name: "", description: "", material: "", intensity: "", capacity: "", img_url: "", categoryId: 0
  });
  const handleOpen = (item: typeof scents[0] | null) => {
    setEdit(item);
    setForm(item ? { ...item } : { name: "", description: "", material: "", intensity: "", capacity: "", img_url: "", categoryId: 0 });
    setOpen(true);
  };
  const handleSave = async () => {
    if (edit) await updateScent(edit.id, { ...form, categoryId: Number(form.categoryId) });
    else await createScent({ ...form, categoryId: Number(form.categoryId) });
    await fetchScents();
    setOpen(false);
  };
  const handleDelete = async (id: number) => {
    await deleteScent(id);
    await fetchScents();
  };
  console.log(scents);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Danh sách Mùi Hương</h2>
        <Button onClick={() => handleOpen(null)} className="gap-2"><Plus className="w-4 h-4" /> Thêm mới</Button>
      </div>
      {isLoading && <div className="flex justify-center py-8"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="overflow-x-auto rounded-lg border shadow-sm bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Chất liệu</TableHead>
              <TableHead>Cường độ</TableHead>
              <TableHead>Sức chứa</TableHead>
              <TableHead>Ảnh</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scents.map((s, idx) => (
              <TableRow key={`${s.id}-${idx}`} className="hover:bg-muted/50">
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell className="max-w-[180px] truncate">{s.description}</TableCell>
                <TableCell>{s.material}</TableCell>
                <TableCell>{s.intensity}</TableCell>
                <TableCell>{s.capacity}</TableCell>
                <TableCell><img src={s.img_url} alt="img" className="w-12 h-12 object-cover rounded" /></TableCell>
                <TableCell>{s.categoryId}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={() => handleOpen(s)}><Pencil className="w-4 h-4" /></Button>
                    <Button size="icon" variant="destructive" onClick={() => handleDelete(s.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg mx-auto">
          <DialogHeader><DialogTitle>{edit ? "Sửa" : "Thêm mới"} Mùi Hương</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <Input placeholder="Tên" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <Textarea placeholder="Mô tả" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            <Input placeholder="Chất liệu" value={form.material} onChange={e => setForm(f => ({ ...f, material: e.target.value }))} />
            <Input placeholder="Cường độ" value={form.intensity} onChange={e => setForm(f => ({ ...f, intensity: e.target.value }))} />
            <Input placeholder="Sức chứa" value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))} />
            <div className="flex gap-2 items-center">
              <Input placeholder="Ảnh (URL)" value={form.img_url} onChange={e => setForm(f => ({ ...f, img_url: e.target.value }))} />
              <input
                type="file"
                accept="image/*"
                id="scent-image-upload"
                style={{ display: 'none' }}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const formData = new FormData();
                  formData.append('file', file);
                  formData.append('upload_preset', 'bmchien1');
                  try {
                    const res = await fetch('https://api.cloudinary.com/v1_1/dukap4zei/image/upload', {
                      method: 'POST',
                      body: formData,
                    });
                    const data = await res.json();
                    if (data.secure_url) {
                      setForm(f => ({ ...f, img_url: data.secure_url }));
                    } else {
                      alert('Upload thất bại!');
                    }
                  } catch (err) {
                    alert('Lỗi upload ảnh!');
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById('scent-image-upload')?.click()}>
                Tải ảnh lên Cloudinary
              </Button>
            </div>
            <div>
              <label className="block mb-1">Danh mục</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={form.categoryId}
                onChange={e => setForm(f => ({ ...f, categoryId: Number(e.target.value) }))}
              >
                <option value={0}>Chọn danh mục</option>
                {scentCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <Button onClick={handleSave}>{edit ? "Lưu" : "Thêm"}</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>Huỷ</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProductAdmin() {
  const options = useMemo(() => ({}), []);
  const { products, isLoading, error, createProduct, updateProduct, deleteProduct, fetchProducts } = useProducts(options);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<null | typeof products[0]>(null);
  const [form, setForm] = useState<Omit<typeof products[0], 'id'> & { id?: number }>({
    name: "", description: "", img_url: "", cost: "", status: true
  });
  const handleOpen = (item: typeof products[0] | null) => {
    setEdit(item);
    setForm(item ? { ...item } : { name: "", description: "", img_url: "", cost: "", status: true });
    setOpen(true);
  };
  const handleSave = async () => {
    if (edit) await updateProduct(edit.id, { ...form });
    else await createProduct({ ...form });
    await fetchProducts();
    setOpen(false);
  };
  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    await fetchProducts();
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Danh sách Sản phẩm có sẵn</h2>
        <Button onClick={() => handleOpen(null)} className="gap-2"><Plus className="w-4 h-4" /> Thêm mới</Button>
      </div>
      {isLoading && <div className="flex justify-center py-8"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="overflow-x-auto rounded-lg border shadow-sm bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Ảnh</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p, idx) => (
              <TableRow key={`${p.id}-${idx}`} className="hover:bg-muted/50">
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell className="max-w-[180px] truncate">{p.description}</TableCell>
                <TableCell><img src={p.img_url} alt="img" className="w-12 h-12 object-cover rounded" /></TableCell>
                <TableCell>{p.cost}</TableCell>
                <TableCell>{p.status ? "Còn" : "Hết"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={() => handleOpen(p)}><Pencil className="w-4 h-4" /></Button>
                    <Button size="icon" variant="destructive" onClick={() => handleDelete(p.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg mx-auto">
          <DialogHeader><DialogTitle>{edit ? "Sửa" : "Thêm mới"} Sản phẩm có sẵn</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <Input placeholder="Tên" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <Textarea placeholder="Mô tả" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            <div className="flex gap-2 items-center">
              <Input placeholder="Ảnh (URL)" value={form.img_url} onChange={e => setForm(f => ({ ...f, img_url: e.target.value }))} />
              <input
                type="file"
                accept="image/*"
                id="product-image-upload"
                style={{ display: 'none' }}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const formData = new FormData();
                  formData.append('file', file);
                  formData.append('upload_preset', 'bmchien1');
                  try {
                    const res = await fetch('https://api.cloudinary.com/v1_1/dukap4zei/image/upload', {
                      method: 'POST',
                      body: formData,
                    });
                    const data = await res.json();
                    if (data.secure_url) {
                      setForm(f => ({ ...f, img_url: data.secure_url }));
                    } else {
                      alert('Upload thất bại!');
                    }
                  } catch (err) {
                    alert('Lỗi upload ảnh!');
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById('product-image-upload')?.click()}>
                Tải ảnh lên Cloudinary
              </Button>
            </div>
            <Input placeholder="Giá" value={form.cost} onChange={e => setForm(f => ({ ...f, cost: e.target.value }))} />
            <div>
              <label className="block mb-1">Trạng thái</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={form.status ? '1' : '0'}
                onChange={e => setForm(f => ({ ...f, status: e.target.value === '1' }))}
              >
                <option value="1">Còn</option>
                <option value="0">Hết</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <Button onClick={handleSave}>{edit ? "Lưu" : "Thêm"}</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>Huỷ</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CategoryAdmin() {
  const options = useMemo(() => ({}), []);
  const { categories, isLoading, error, createCategory, updateCategory, deleteCategory, fetchCategories } = useCategories(options);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<null | typeof categories[0]>(null);
  const [form, setForm] = useState<{ name: string; entityType: number; id?: number }>({ name: "", entityType: 1 });
  const entityTypeOptions = [
    { value: 1, label: "Box" },
    { value: 2, label: "Card" },
    { value: 3, label: "Color" },
    { value: 4, label: "Mold" },
    { value: 5, label: "Scent" },
  ];
  const handleOpen = (item: typeof categories[0] | null) => {
    setEdit(item);
    setForm(item ? { ...item } : { name: "", entityType: 1 });
    setOpen(true);
  };
  const handleSave = async () => {
    if (edit) await updateCategory(edit.id, { name: form.name, entityType: form.entityType });
    else await createCategory({ name: form.name, entityType: form.entityType });
    await fetchCategories();
    setOpen(false);
  };
  const handleDelete = async (id: number) => {
    await deleteCategory(id);
    await fetchCategories();
  };
  console.log(categories);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Danh sách Danh Mục</h2>
        <Button onClick={() => handleOpen(null)} className="gap-2"><Plus className="w-4 h-4" /> Thêm mới</Button>
      </div>
      {isLoading && <div className="flex justify-center py-8"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="overflow-x-auto rounded-lg border shadow-sm bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Loại Entity</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((c, idx) => (
              <TableRow key={`${c.id}-${idx}`} className="hover:bg-muted/50">
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{entityTypeOptions.find(e => e.value === c.entityType)?.label || c.entityType}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={() => handleOpen(c)}><Pencil className="w-4 h-4" /></Button>
                    <Button size="icon" variant="destructive" onClick={() => handleDelete(c.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg mx-auto">
          <DialogHeader><DialogTitle>{edit ? "Sửa" : "Thêm mới"} Danh Mục</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <Input placeholder="Tên danh mục" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <div>
              <label className="block mb-1">Loại Entity</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={form.entityType}
                onChange={e => setForm(f => ({ ...f, entityType: Number(e.target.value) }))}
              >
                {entityTypeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <Button onClick={handleSave}>{edit ? "Lưu" : "Thêm"}</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>Huỷ</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function AdminPage() {
  // Đặt tất cả các hook ở đầu
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState("box");

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("admin_logged_in") === "true") {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      loginForm.username === ADMIN_USER &&
      loginForm.password === ADMIN_PASS
    ) {
      setLoggedIn(true);
      setLoginError("");
      if (typeof window !== "undefined") localStorage.setItem("admin_logged_in", "true");
    } else {
      setLoginError("Sai tài khoản hoặc mật khẩu!");
    }
  };

  // Sau khi đã gọi hết các hook, mới return điều kiện
  if (!loggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Header />
        <div className="w-full max-w-xs mx-auto bg-white p-8 rounded shadow">
          <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập Admin</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1">Tài khoản</label>
              <Input
                value={loginForm.username}
                onChange={e => setLoginForm(f => ({ ...f, username: e.target.value }))}
                placeholder="Tên đăng nhập"
                autoFocus
                required
              />
            </div>
            <div>
              <label className="block mb-1">Mật khẩu</label>
              <Input
                type="password"
                value={loginForm.password}
                onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                placeholder="Mật khẩu"
                required
              />
            </div>
            {loginError && <div className="text-red-600 text-sm">{loginError}</div>}
            <Button type="submit" className="w-full">Đăng nhập</Button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Trang Quản Trị</h1>
        <div className="flex gap-2 mb-8">
          {TABS.map((t) => (
            <Button
              key={t.key}
              variant={tab === t.key ? "default" : "outline"}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </Button>
          ))}
        </div>
        <div className="bg-white rounded shadow p-6 min-h-[400px]">
          {tab === "box" && <BoxAdmin />}
          {tab === "card" && <CardAdmin />}
          {tab === "color" && <ColorAdmin />}
          {tab === "mold" && <MoldAdmin />}
          {tab === "scent" && <ScentAdmin />}
          {tab === "product" && <ProductAdmin />}
          {tab === "category" && <CategoryAdmin />} {/* Thêm tab Category */}
        </div>
      </div>
      <Footer />
    </div>
  );
} 