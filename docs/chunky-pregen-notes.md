# Chunky pregen — NovaPrison

Cập nhật: 2026-08-04.

Plugin: **Chunky 1.3.146** (`plugins/Chunky-1.3.146.jar`) — Paper **1.18–1.20.6**, Java 17 (khớp `paper-1.19.4-550.jar`).

Nguồn: [Hangar Chunky 1.3.146](https://hangar.papermc.io/pop4959/Chunky/versions/1.3.146).

## Phạm vi đã chốt

| World | Radius (block) | Center (Multiverse spawn XZ) | Shape | Ước lượng chunks |
| --- | --- | --- | --- | --- |
| `world` | 1000 | -13, -1 | square | ~15.6k |
| `world_prison` | 1000 | 5, 122 | square | ~15.6k |
| `world_dungeon` | 500 | 1, 3 | square | ~4k |
| `world_dungeon_2` | 500 | -208, 144 | square | ~4k (nhiều chunk đã có) |

Không pregen trong đợt này: `world_nether`, `world_the_end`, `world_mine`, `world_magadungeon`.

Không gắn worldborder / ChunkyBorder (tránh cắt map dungeon nếu playable area lệch spawn).

## Quy trình maintenance

1. Khuyến nghị **0 player** hoặc giờ thấp; **một world một task**.
2. Không chạy song song nhiều world trên heap 2G (`run.bat` `-Xmx2G`).
3. Theo dõi TPS — lag thì `chunky pause`.
4. Restart giữa chừng: sau boot chạy `chunky continue`.
5. Sau khi xong: `chunky progress`, kiểm tra TPS, ghi dung lượng folder world nếu cần.

Thứ tự đề xuất (nhẹ → nặng): `world_dungeon` → `world_dungeon_2` → `world` → `world_prison`.

## Lệnh chuẩn từng world

Console hoặc op (pattern giống nhau):

```text
chunky world <name>
chunky shape square
chunky spawn
chunky radius <r>
chunky silent
chunky start
```

### world_dungeon (r500)

```text
chunky world world_dungeon
chunky shape square
chunky spawn
chunky radius 500
chunky silent
chunky start
```

### world_dungeon_2 (r500)

```text
chunky world world_dungeon_2
chunky shape square
chunky spawn
chunky radius 500
chunky silent
chunky start
```

### world (r1000)

```text
chunky world world
chunky shape square
chunky spawn
chunky radius 1000
chunky silent
chunky start
```

### world_prison (r1000)

```text
chunky world world_prison
chunky shape square
chunky spawn
chunky radius 1000
chunky silent
chunky start
```

## Điều khiển task

| Lệnh | Việc |
| --- | --- |
| `chunky progress` | Xem % / ETA / rate |
| `chunky pause` | Tạm dừng, giữ progress |
| `chunky continue` | Tiếp tục task đã pause / sau restart |
| `chunky cancel` | Hủy task (mất progress task đó) |
| `chunky selection` | Xem selection hiện tại |
| `chunky silent` | Bật/tắt spam update message |

Đợi task **complete** trước khi `chunky world` sang world tiếp theo.

## Paper / hiệu năng

- Config mặc định Chunky ổn; chỉ chỉnh `quiet` nếu spam console.
- Không đổi vĩnh viễn `config/paper-global.yml`.
- Nếu pregen quá chậm trên maintenance: tạm tăng `chunk-system.worker-threads`, **revert** sau khi xong.
- `world_dungeon_2` đã lớn (~553MB trước pregen): Chunky skip chunk có sẵn, chủ yếu fill vùng thiếu trong r500 quanh spawn.

## Checklist sau pregen

- [x] Bốn task complete (`chunky progress` trống / done) — 2026-08-04
- [x] TPS ổn định sau idle (`20.0 / 19.8 / 19.93`)
- [x] Folder world — size trước/sau ghi bên dưới
- [ ] Backup world nếu chưa có backup gần đây (ops ngoài repo)

## Kết quả chạy 2026-08-04

| World | Chunks | Thời gian | Size trước | Size sau |
| --- | --- | --- | --- | --- |
| `world_dungeon` | 4225 | 0:00:04 | 15.3 MB | 30.5 MB |
| `world_dungeon_2` | 4225 | 0:00:30 | 552.5 MB | 552.5 MB |
| `world` | 16129 | 0:00:29 | 75.2 MB | 109.6 MB |
| `world_prison` | 16129 | 0:00:21 | 71.6 MB | 133.2 MB |

Jar: `plugins/Chunky-1.3.146.jar`. Config mặc định: `plugins/Chunky/config.yml`.

Script ops (RCON lần lượt, có skip arg): [`scripts/chunky_pregen_rcon.py`](../scripts/chunky_pregen_rcon.py). Log: `logs/chunky-pregen-run.log`.

## Ghi chú dung lượng (điền sau khi chạy)

Đã điền bảng **Kết quả chạy 2026-08-04** ở trên.
