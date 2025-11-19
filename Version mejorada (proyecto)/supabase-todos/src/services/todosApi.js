import { supabase } from './supabaseClient';

export async function getTodos() {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addTodo(text, priority = 'media') {
  const { data, error } = await supabase
    .from('todos')
    .insert([{ text, done: false, priority }])
    .select();
  if (error) throw error;
  return data[0];
}

export async function updateTodo(id, done) {
  const { data, error } = await supabase
    .from('todos')
    .update({ done })
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
}

export async function deleteTodo(id) {
  const { error } = await supabase.from('todos').delete().eq('id', id);
  if (error) throw error;
  return true;
}


