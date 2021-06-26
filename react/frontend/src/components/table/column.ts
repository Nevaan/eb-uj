export interface Column<T> {
    id: T;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
}