import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [moduleCode, setModuleCode] = useState('');
  const [priority, setPriority] = useState('High');

  const handleSubmit = async () => {
    const trimmedTitle = title.trim();
    const trimmedCode = moduleCode.trim();

    if (!trimmedTitle || !trimmedCode) {
      return;
    }

    const didAdd = await onAddTask(trimmedTitle, trimmedCode, priority);

    if (didAdd) {
      setTitle('');
      setModuleCode('');
      setPriority('High');
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.heading}>Add New Task</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Task title"
        placeholderTextColor="#8a94a6"
      />

      <TextInput
        style={styles.input}
        value={moduleCode}
        onChangeText={setModuleCode}
        placeholder="Module code"
        placeholderTextColor="#8a94a6"
        autoCapitalize="characters"
      />

      <Text style={styles.priorityLabel}>Priority</Text>
      <View style={styles.priorityRow}>
        {['Low', 'Medium', 'High'].map((option) => {
          const isSelected = priority === option;

          return (
            <Pressable
              key={option}
              onPress={() => setPriority(option)}
              style={[
                styles.priorityButton,
                isSelected && styles.selectedPriority,
              ]}
            >
              <Text
                style={[
                  styles.priorityText,
                  isSelected && styles.selectedPriorityText,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable onPress={handleSubmit} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#172033',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: '#D8E1EC',
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#172033',
    marginBottom: 12,
  },
  priorityLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#526075',
    marginBottom: 8,
  },
  priorityRow: {
    flexDirection: 'row',
    marginBottom: 14,
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    minHeight: 38,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D8E1EC',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  selectedPriority: {
    backgroundColor: '#1565C0',
    borderColor: '#1565C0',
  },
  priorityText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '600',
  },
  selectedPriorityText: {
    color: '#ffffff',
  },
  addButton: {
    backgroundColor: '#1565C0',
    borderRadius: 9,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
