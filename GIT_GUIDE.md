
# Git — Инструкция по использованию

## Настройки репозитория
- **Имя:** NeuroRinok
- **Email:** dev@neurorinok.local

---

## Основные команды

### Посмотреть историю коммитов
```bash
git log --oneline
```

### Посмотреть текущий статус (что изменилось)
```bash
git status
```

### Посмотреть что именно изменилось в файлах
```bash
git diff
```

---

## Сохранить прогресс (сделать чекпоинт)

```bash
cd D:/neurorinok
git add .
git commit -m "описание что сделано"
```

Пример:
```bash
git commit -m "checkpoint: объединил marketplace и category"
```

---

## Вернуться к предыдущему коммиту

### Шаг 1 — посмотреть список коммитов
```bash
git log --oneline
```
Пример вывода:
```
a1b2c3d  checkpoint: новая фича
bc4b2dd  checkpoint: marketplace + category pages, mega-menu, hero redesign
```

### Шаг 2 — вернуться к нужному коммиту
```bash
git reset --hard bc4b2dd
```
Замени `bc4b2dd` на нужный ID из списка.

> ⚠️ Это удалит все несохранённые изменения после того коммита

---

## Создать ветку (для экспериментов)

```bash
git checkout -b название-ветки
```

Пример:
```bash
git checkout -b merge-marketplace-category
```

### Вернуться на основную ветку
```bash
git checkout master
```

### Слить ветку в master (если всё хорошо)
```bash
git checkout master
git merge merge-marketplace-category
```

### Удалить ветку (если не нужна)
```bash
git branch -d merge-marketplace-category
```

---

## Текущие коммиты проекта

| ID | Описание |
|----|----------|
| `bc4b2dd` | checkpoint: marketplace + category pages, mega-menu, hero redesign |

> Этот список обновляется вручную при каждом новом чекпоинте.

---

## Быстрая шпаргалка

| Действие | Команда |
|----------|---------|
| Сохранить всё | `git add . && git commit -m "описание"` |
| Посмотреть историю | `git log --oneline` |
| Откатиться к коммиту | `git reset --hard [ID]` |
| Создать ветку | `git checkout -b [название]` |
| Переключить ветку | `git checkout [название]` |
| Текущий статус | `git status` |
