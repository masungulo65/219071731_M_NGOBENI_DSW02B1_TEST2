import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
} from 'react-native';

export default function TaskList({ tasks, onToggle, onDelete }) {
  const renderItem = ({ item }) => (
    <View style={styles.taskCard}>
      <Pressable
        onPress={() => onToggle(item)}
        style={styles.taskContent}
      >
        <View style={styles.checkColumn}>
          <View
            style={[
              styles.checkbox,
              item.completed && styles.checkboxChecked,
            ]}
          >
            {item.completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              item.completed && styles.completedTitle,
            ]}
          >
            {item.title}
          </Text>
          <Text style={styles.moduleCode}>Module: {item.moduleCode}</Text>
          <Text style={styles.priority}>Priority: {item.priority}</Text>
        </View>
      </Pressable>

      <Pressable onPress={() => onDelete(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 24,
  },
  taskCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkColumn: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#A3B4C9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#1565C0',
    borderColor: '#1565C0',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#172033',
    marginBottom: 4,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#60708a',
  },
  moduleCode: {
    fontSize: 13,
    color: '#526075',
    marginBottom: 2,
  },
  priority: {
    fontSize: 12,
    color: '#687386',
  },
  deleteButton: {
    marginLeft: 12,
    backgroundColor: '#FDECEC',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  deleteText: {
    color: '#C62828',
    fontSize: 12,
    fontWeight: '700',
  },
});
